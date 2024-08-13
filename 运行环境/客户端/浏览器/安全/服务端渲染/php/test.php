<?php
// header('X-Xss-Protection: 0');
// ctx.set(`Content-Security-Policy`, `script-src 'self'`);
// header("Content-Security-Policy: script-src 'self'");

// require_once './library/HTMLPurifier.auto.php';
// $csrfToken = '123456';
// setcookie('csrfToken', $csrfToken);

// var_dump($_POST['csrfToken'], $_COOKIE['csrfToken']);
// header('Set-Cookie: test=12345; SameSite=Lax');

/*if($_SERVER['HTTP_REFERER']){
	$isLegal = strpos($_SERVER['HTTP_REFERER'], 'http://websecurity.local/') === 0;
	var_dump($isLegal);
}*/
session_start(); //启动session

function getCaptcha(){
	$code = '';
	$image = imagecreatetruecolor(100,30);//创建一个宽100，高度30的图片
	$bgcolor = imagecolorallocate($image,255,255,255);//图片背景是白色
	imagefill($image, 0, 0, $bgcolor);//图片填充白色
	//随机数，下面的例子是只是数字的验证码
	for($i=0; $i<4; $i++){
	  $fontsize = 6;
	  $fontcolor = imagecolorallocate($image,rand(0,120),rand(0,120),rand(0,120));
	  $fontcontent = rand(0,9);
	  $code .= $fontcontent;
	  $x = ($i*100/4) + rand(5, 10);
	  $y = rand(5, 10);
	  imagestring($image,$fontsize,$x,$y,$fontcontent,$fontcolor);
	}
	return [
		'image' => $image,
		'code' => $code
	];
}

// 如果访问验证码
if($_GET['captcha']){
	$captcha = getCaptcha();
	$_SESSION['captcha'] = $captcha['code'];
	header("content-type:image/png");
	imagepng($captcha['image']);
	// imagedestory($captcha['image']);
	die;
}

// var_dump($_POST['captcha'], $_SESSION['captcha']);

// ctx.set('X-Frame-Options', 'DENY');
header('X-Frame-Options: DENY');

// var_dump(md5('123456'));
// var_dump(sha1('123456'));
// var_dump(hash('md5', '123456'));
// var_dump(hash('sha256', '123456'));

// 传参id
/*$id = intval($_GET['id']);
$title = $_GET['title'];*/
/*// 建立数据库连接
$conn = mysql_connect("172.17.0.1","root","");
// 选择DB
mysql_select_db("safety", $conn);
// 传参title
$title = mysql_real_escape_string($_GET['title']);
// 准备SQL语句
//$sql = "SELECT * FROM post where id='".$id."'";
$sql = "SELECT * FROM post where title like '%".$title."%'";
// 查询DB
$result = mysql_query($sql);
// 获取结果
$row = mysql_fetch_array($result);

// 打印
var_dump($row['id'], $row['title'], $row['content']);

// 关闭连接
mysql_close($conn);*/

/*$conn = new PDO(
    'mysql:host=172.17.0.1;dbname=safety',
    'root',
    '',
    []
);
$stmt = $conn->prepare("SELECT * FROM post where title like :title");
$stmt->execute([
	'title' => '%'.$title.'%'
]);
$rows = $stmt->fetchAll();
$row = $rows[0];
var_dump($row['id'], $row['title']);*/

function minimime($fname) {
    $fh=fopen($fname,'rb');
    if ($fh) {
        $bytes6=fread($fh,6);
        fclose($fh);
        if ($bytes6===false) return false;
        if (substr($bytes6,0,3)=="\xff\xd8\xff") return 'image/jpeg';
        if ($bytes6=="\x89PNG\x0d\x0a") return 'image/png';
        if ($bytes6=="GIF87a" || $bytes6=="GIF89a") return 'image/gif';
        return 'application/octet-stream';
    }
    return false;
}

if($_GET['down']){
	$file = file_get_contents('./test.php');
	header('Content-Type: text/plain');
	die($file);
}

if(strtolower($_SERVER['REQUEST_METHOD']) == 'post'){
	$content = $_POST['content'];

	// var_dump($_FILES['img']);
	/*$info = finfo_file(finfo_open(), $_FILES['img']['tmp_name']);
	var_dump($info);*/
	/*if($_FILES['img']['type'] !== 'image/png'){

	}*/
	/*$info = pathinfo($_FILES['img']['name']);
	if($info['extension'] !== 'png'){

	}
	var_dump($info);*/
	// $content = strip_tags($content);
	// & < > ' "
	// $content = htmlspecialchars($content, ENT_QUOTES);

	// $purifier = new HTMLPurifier();
	// $content = $purifier->purify($content);


?>
<div><?php echo $content;?></div>
<?php
}
?>
<div>SQL:<em style="color:red"><?php echo $sql;?></em></div>
<script>
	if(top.location !== window.location){
		top.location = window.location;
	}
</script>
<form method="post" enctype="multipart/form-data">
	<!-- <input type="text" name="captcha" value=""/> -->
	<!-- <img src="/test.php?captcha=1"/> -->
	<input type="file" name="img" />
	<textarea name="content">hello</textarea>
	<button type="submit">提交</button>
</form>
