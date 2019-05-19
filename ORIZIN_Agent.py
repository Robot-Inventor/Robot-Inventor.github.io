## -*- coding: utf8 -*-


import tkinter as tk
import tkinter.filedialog
import tkinter.messagebox
import subprocess
from subprocess import getoutput
import time
import random
import urllib.request
import re


nameOfThisSoftware = 'ORIZIN　AIアシスタント'
dictionary = ''
index = 0
notAdjustedQuestion = ''
response = ''
knownQuestion = False


def whereAmI():
    global thisDir
    tk.messagebox.showinfo(nameOfThisSoftware, '「ORIZIN　AIアシスタント」(本プログラム。ファイル名は「ORIZIN_Agent.py」)が保存されているディレクトリを選択してください。\n\nPlease select directory which this computer program, "ORIZIN_Agent.py" is in.')
    thisDir = tk.filedialog.askdirectory()

def readDictionary():
    f = open(thisDir + '/response.txt')
    global dictionary
    global index
    dictionaryFile = f.read()
    index = dictionaryFile.count('\n') + 1
    if index != dictionaryFile.count(':') :
        biggerNum = 0
        if index > dictionaryFile.count(':'):
            biggerNum = index
        else:
            biggerNum = dictionaryFile.count(':')
        dictionaryChecker = dictionaryFile
        badPoint = ''
        for num in range(biggerNum):
            if dictionaryChecker[0:dictionaryChecker.find('\n')].count(':') != 1:
                badPoint += '\n"' + dictionaryChecker[0:dictionaryChecker.find('\n')] + '"(' + str(num + 1) + '行目)'
            dictionaryChecker = dictionaryChecker[dictionaryChecker.find('\n') + 1:]
        tk.messagebox.showinfo(nameOfThisSoftware, '辞書ファイルの単語リストの数(' + str(index) + '個）と応答の数(' + str(dictionaryFile.count(':')) + '個）が一致しません。\n' + '問題のある箇所:' + badPoint)
    dictionary = dictionaryFile
    f.close()

def worker():
    global notAdjustedQuestion
    notAdjustedQuestion = requestBox.get()
    question = adjustQuestion(notAdjustedQuestion)
    if judge(question, ['catlife', 'キャットライフ']):
        speak('私の好きな曲は、キャットライフです。キャットライフを再生します。', '私の好きな曲は、Cat lifeです。Cat lifeを再生します。')
        playSound(thisDir + '/sounds/musics/wav/catLife.wav')
    elif judge(question, ['曲', '音楽', '楽曲', '歌', '唄', 'うた', 'ミュージック']):
        if random.randint(0, 1) == 0:
            speak('私の好きな曲は、キャットライフです。キャットライフを再生します。', '私の好きな曲は、Cat lifeです。Cat lifeを再生します。')
            playSound(thisDir + '/sounds/musics/wav/catLife.wav')
        else:
            speak('私の好きな曲は、せんじんです。せんじんを再生します。', '私の好きな曲は、戦神です。戦神を再生します。')
            playSound(thisDir + '/sounds/musics/wav/senjin.wav')
    elif judge(question, ['昔話', '昔噺', 'むかしばなし', 'むかし話', 'むかし噺', '昔ばなし']):
        speak('昔話ですか。では一つ、お聞かせします。')
        resultBox.insert('end', open(thisDir + '/sounds/musics/wav/mukashibanashi.txt').read())
        playSound(thisDir + '/sounds/musics/wav/mukashibanashi.wav')
    elif judge(question, ['じゃんけん', 'ジャンケン']):
        randomInt = random.randint(0, 2)
        if randomInt == 0:
            speak('ジャンケンですか。良いですね。やりましょう。それではいきますよ。ジャン　ケン　ポン。私はグーです。')
        elif randomInt == 1:
            speak('ジャンケンですか。良いですね。やりましょう。それではいきますよ。ジャン　ケン　ポン。私はチョキです。')
        else:
            speak('ジャンケンですか。良いですね。やりましょう。それではいきますよ。ジャン　ケン　ポン。私はパーです。')
    elif judge(question, ['ニュース', 'news']):
        speak('最新のニュースを3件、日本テレビのウェブサイトより取得します。')
        newsTitle, newsContent = getNews(3)
        for num in range(3):
            if num !=0:
                speak('次のニュースです。', '', prompt = False)
            speak(newsTitle[num], '[' + newsTitle[num] + ']', prompt = False)
            speak(newsContent[num], prompt = False)
            time.sleep(3)
        speak('以上、ニュースをお伝えしました。', prompt = False)
    elif judge(question, ['早口言葉', '早口ことば', 'はやくち言葉', 'はやくちことば']):
        speak('早口言葉を言いますね。')
        speak('生ごみ生米生卵。赤巻紙青巻紙黄巻紙。東京特許許可局。', prompt = False, speed = 1.5)
        speak('もう一度。', prompt = False)
        speak('生ごみ生米生卵。赤巻紙青巻紙黄巻紙。東京特許許可局。', prompt = False, speed = 2)
    else:
        searchresponse(question)

def workerFromShortcut(event):
    worker()
    
def searchresponse(request):
    global response
    global knownQuestion
    knownQuestion = False
    candidateForDictionary = re.split('[\n:]', dictionary)[::2]
    candidateForResponse = re.split('[\n:]', dictionary)[1::2]
    for num in range(index):
        if judge(request, candidateForDictionary[num].split('/')):
            responseAndInsertContent = candidateForResponse[num].split('/')
            speak(responseAndInsertContent[0], responseAndInsertContent[candidateForResponse[num].count('/')])
            knownQuestion = True
            break
    if knownQuestion == False:
        f = open(thisDir + '/unkownQuestions.txt', 'a')
        f.write(request + '\n')
        f.close()
        speak('そうですか。')

def speak(content, insertContent = 'no arg', *, request = 'no arg', prompt = True, speed = 1):
    global response
    response = content
    getoutput('echo "' + content + '" | open_jtalk -x /var/lib/mecab/dic/open-jtalk/naist-jdic -m /usr/share/hts-voice/mei/mei_normal.htsvoice  -ow /dev/stdout -fm -5 -r ' + str(speed) + ' | aplay')
    if insertContent == 'no arg':
        insertContent = content
    promptMark = '\n\n>>>'
    requestSentence = notAdjustedQuestion
    if prompt == False:
        promptMark = ''
        requestSentence = ''
    resultBox.insert('end', promptMark + requestSentence + '\n' + insertContent)

def playSound(soundFile):
    command = 'aplay ' + soundFile
    global soundPlayer
    soundPlayer = subprocess.Popen(command.split())

def stopSound():
    soundPlayer.terminate()

def fullpitchToHalfPitch(sentence):
    return sentence.translate(str.maketrans('ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'))

def removeUnnecessary(sentence):
    return sentence.translate(str.maketrans({' ':None, '　':None, '・':None, '_':None}))

def adjustQuestion(sentence):
    return removeUnnecessary(fullpitchToHalfPitch(sentence.lower()))

def judge(character, array):
    for num in range(len(array)):
        if array[num] in character:
            return True
    return False

def getNews(numOfItem):
    url = 'http://www.news24.jp/rss/index.rdf'
    rssFile = urllib.request.urlopen(url).read().decode('shift_jis')
    news = rssFile[rssFile.find('</channel>'):]
    news = news[news.find('<title>') + 7:]
    summary = []
    details = []
    for num in range(numOfItem):
        news = news[news.find('<title>') + 7:]
        summary.append(news[:news.find('</title>') - 13])
        details.append(news[news.find('<description>') + 13:news.find('</description>')])
        news = news[news.find('</description>'):]
    return summary, details

def shutdown():
    quit()

def shutdownFromShortcut(event):
    shutdown()

def reset():
    resultBox.delete(0, 'end')

def resetFromShortcut(event):
    reset()


root = tk.Tk()
root.title(nameOfThisSoftware)
root.geometry("500x300")

root.bind('<Control-q>', shutdownFromShortcut)
root.bind('<Control-Delete>', resetFromShortcut)
root.bind('<Return>', workerFromShortcut)

whereAmI()
readDictionary()

mainFrame = tk.Frame(root, height=300)
mainFrame.pack(anchor=tk.NW, expand=1, fill=tk.BOTH)

controllerFrame = tk.Frame(mainFrame, height=100)
controllerFrame.pack(anchor=tk.NW, pady=5, expand=1, fill=tk.X)

requestBox = tk.Entry(controllerFrame)
requestBox.pack(anchor=tk.NW, side=tk.LEFT, expand=1, fill=tk.BOTH)

startButton = tk.Button(controllerFrame, text='実行', command=worker)
startButton.pack(side=tk.LEFT, anchor=tk.NW)

stopFrame = tk.Frame(mainFrame, height=100)
stopFrame.pack(anchor=tk.NW, side=tk.TOP, expand=1, fill=tk.X)

stopButton = tk.Button(stopFrame, text='音楽をストップ', command=stopSound)
stopButton.pack(side=tk.LEFT, anchor=tk.NW)

resultFrame = tk.Frame(mainFrame)
resultFrame.pack(anchor=tk.NW, expand=1, fill=tk.BOTH)

resultBox = tk.Text(resultFrame)
resultBox.pack(side=tk.LEFT, anchor=tk.NW, expand=1, fill=tk.BOTH)


root.mainloop()
