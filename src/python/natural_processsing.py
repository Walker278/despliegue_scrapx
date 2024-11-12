import nltk

nltk.download('punkt')

with open('../csv/noticias_111124.csv', 'r', encoding='utf-8') as file:
    text = file.read()

setences = nltk.sent_tokenize(text)

for s in setences:
    print(s)

tokens = [t for t in text.split()]

print(tokens)