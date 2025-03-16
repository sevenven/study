from collections import Counter  # 导入 Counter 类，用于统计可迭代对象中元素的频率
import re  # 导入 re 模块，用于正则表达式操作


def word_frequency_analysis(sentence):
    # 使用正则表达式提取句子中的所有单词，并将其转换为小写
    words = re.findall(r"\b\w+\b", sentence.lower())
    # 使用 Counter 统计每个单词的出现频率，并返回结果
    return Counter(words)


# 示例文本
text = """
Python is an interpreted, high-level and general-purpose programming language.
Python's design philosophy emphasizes code readability with its notable use of significant whitespace.
Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.
"""

# 分析文本中的单词频率
word_counts = word_frequency_analysis(text)
# 打印最常出现的 5 个单词
print(word_counts.most_common(5))
