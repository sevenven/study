import { createPromiseCallback } from '../util'
import { createBundleRunner } from './create-bundle-runner'
import type { Renderer, RenderOptions } from '../create-renderer'
import {
  createSourceMapConsumers,
  rewriteErrorTrace
} from './source-map-support'

const fs = require('fs')
const path = require('path')
const PassThrough = require('stream').PassThrough

const INVALID_MSG =
  'Invalid server-rendering bundle format. Should be a string ' +
  'or a bundle Object of type:\n\n' +
  `{
  entry: string;
  files: { [filename: string]: string; };
  maps: { [filename: string]: string; };
}\n`

// The render bundle can either be a string (single bundled file)
// or a bundle manifest object generated by vue-ssr-webpack-plugin.
type RenderBundle = {
  basedir?: string
  entry: string
  files: { [filename: string]: string }
  maps: { [filename: string]: string }
  modules?: { [filename: string]: Array<string> }
}

export function createBundleRendererCreator(
  createRenderer: (options?: RenderOptions) => Renderer
) {
  return function createBundleRenderer(
    bundle: string | RenderBundle,
    rendererOptions: RenderOptions = {}
  ) {
    let files, entry, maps
    let basedir = rendererOptions.basedir

    // load bundle if given filepath
    if (
      typeof bundle === 'string' &&
      /\.js(on)?$/.test(bundle) &&
      path.isAbsolute(bundle)
    ) {
      if (fs.existsSync(bundle)) {
        const isJSON = /\.json$/.test(bundle)
        basedir = basedir || path.dirname(bundle)
        bundle = fs.readFileSync(bundle, 'utf-8')
        if (isJSON) {
          try {
            // @ts-expect-error
            bundle = JSON.parse(bundle)
          } catch (e: any) {
            throw new Error(`Invalid JSON bundle file: ${bundle}`)
          }
        }
      } else {
        throw new Error(`Cannot locate bundle file: ${bundle}`)
      }
    }

    if (typeof bundle === 'object') {
      entry = bundle.entry
      files = bundle.files
      basedir = basedir || bundle.basedir
      maps = createSourceMapConsumers(bundle.maps)
      if (typeof entry !== 'string' || typeof files !== 'object') {
        throw new Error(INVALID_MSG)
      }
    } else if (typeof bundle === 'string') {
      entry = '__vue_ssr_bundle__'
      files = { __vue_ssr_bundle__: bundle }
      maps = {}
    } else {
      throw new Error(INVALID_MSG)
    }

    const renderer = createRenderer(rendererOptions)

    const run = createBundleRunner(
      entry,
      files,
      basedir,
      rendererOptions.runInNewContext
    )

    return {
      renderToString: (context?: Object | undefined, cb?: any) => {
        if (typeof context === 'function') {
          cb = context
          context = {}
        }

        let promise
        if (!cb) {
          ;({ promise, cb } = createPromiseCallback())
        }

        run(context)
          .catch(err => {
            rewriteErrorTrace(err, maps)
            cb(err)
          })
          .then(app => {
            if (app) {
              //@ts-expect-error
              renderer.renderToString(app, context, (err, res) => {
                rewriteErrorTrace(err, maps)
                cb(err, res)
              })
            }
          })

        return promise
      },

      renderToStream: (context?: Object) => {
        const res = new PassThrough()
        run(context)
          .catch(err => {
            rewriteErrorTrace(err, maps)
            // avoid emitting synchronously before user can
            // attach error listener
            process.nextTick(() => {
              res.emit('error', err)
            })
          })
          .then(app => {
            if (app) {
              //@ts-expect-error
              const renderStream = renderer.renderToStream(app, context)

              renderStream.on('error', err => {
                rewriteErrorTrace(err, maps)
                res.emit('error', err)
              })

              // relay HTMLStream special events
              if (rendererOptions && rendererOptions.template) {
                renderStream.on('beforeStart', () => {
                  res.emit('beforeStart')
                })
                renderStream.on('beforeEnd', () => {
                  res.emit('beforeEnd')
                })
              }

              renderStream.pipe(res)
            }
          })

        return res
      }
    }
  }
}
