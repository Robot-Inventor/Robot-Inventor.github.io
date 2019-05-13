## -*- coding: utf8 -*-


import tkinter as tk
import tkinter.filedialog
import tkinter.messagebox
import subprocess
from subprocess import getoutput
import time
import random


nameOfThisSoftware = 'ORIZIN　AIアシスタント'
dictionary = ''
index = 0
notAdjustedQuestion = ''
responce = ''
knownQuestion = False


def whereAmI():
    global thisDir
    tk.messagebox.showinfo(nameOfThisSoftware, '「ORIZIN　AIアシスタント」(本プログラム。ファイル名は「ORIZIN_Agent.py」)が保存されているディレクトリを選択してください。\n\nPlease select directory which this computer program, "ORIZIN_Agent.py" is in.')
    thisDir = tk.filedialog.askdirectory()

def readDictionary():
    f = open(thisDir + '/responce.txt')
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

def run():
    global notAdjustedQuestion
    notAdjustedQuestion = requestBox.get()
    question = adjustQuestion(notAdjustedQuestion)
    if question.find('catlife') != -1 or question.find('キャットライフ') != -1:
        speak('私の好きな曲は、キャットライフです。キャットライフを再生します。')
        playSound(thisDir + '/sounds/musics/wav/catLife.wav')
    elif question.find('曲') != -1 or question.find('音楽') != -1 or question.find('楽曲') != -1 or question.find('歌') != -1 or question.find('唄') != -1 or question.find('うた') != -1 or question.find('ミュージック') != -1:
        if random.randint(0, 1) == 0:
            speak('私の好きな曲は、キャットライフです。キャットライフを再生します。')
            playSound(thisDir + '/sounds/musics/wav/catLife.wav')
        else:
            speak('私の好きな曲は、戦神です。戦神を再生します。')
            playSound(thisDir + '/sounds/musics/wav/senjin.wav')
    elif question.find('昔話') != -1 or question.find('昔噺') != -1 or question.find('むかしばなし') != -1 or question.find('むかし話') != -1 or question.find('むかし噺') != -1 or question.find('昔ばなし') != -1:
        speak('昔話ですか。では一つ、お聞かせします。')
        resultBox.insert('end', open(thisDir + '/sounds/musics/wav/mukashibanashi.txt').read())
        playSound(thisDir + '/sounds/musics/wav/mukashibanashi.wav')
    elif question.find('じゃんけん') != -1 or question.find('ジャンケン') != -1:
        randomInt = random.randint(0, 2)
        if randomInt == 0:
            speak('ジャンケンですか。良いですね。やりましょう。それではいきますよ。ジャン　ケン　ポン。私はグーです。')
        elif randomInt == 1:
            speak('ジャンケンですか。良いですね。やりましょう。それではいきますよ。ジャン　ケン　ポン。私はチョキです。')
        else:
            speak('ジャンケンですか。良いですね。やりましょう。それではいきますよ。ジャン　ケン　ポン。私はパーです。')
    else:
        searchResponce(question)

def runFromShortcut(event):
    run()
    
def searchResponce(request):
    global responce
    global knownQuestion
    knownQuestion = False
    candidateForDictionary = dictionary
    for num in range(index):
        if request.find(candidateForDictionary[0:candidateForDictionary.find(':')]) != -1:
            speak(candidateForDictionary[candidateForDictionary.find(':') + 1:candidateForDictionary.find('\n')])
            knownQuestion = True
            break
        else:
            candidateForDictionary = candidateForDictionary[candidateForDictionary.find('\n') + 1:]
    if knownQuestion == False:
        f = open(thisDir + '/unkownQuestions.txt', 'a')
        f.write(request + '\n')
        f.close()
        speak('そうですか。')

def speak(content):
    global responce
    responce = content
    command = 'echo "' + content + '" | open_jtalk -x /var/lib/mecab/dic/open-jspeak/naist-jdic -m /usr/share/hts-voice/mei/mei_normal.htsvoice  -ow /dev/stdout -fm -5 | aplay'
    speaker = subprocess.Popen(command.split(), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    speaker.communicate()
    #getoutput('echo "' + content + '" | open_jtalk -x /var/lib/mecab/dic/open-jspeak/naist-jdic -m /usr/share/hts-voice/mei/mei_normal.htsvoice  -ow /dev/stdout -fm -5 | aplay')
    resultBox.insert('end', notAdjustedQuestion + '\n' + responce + '\n>>>')

def playSound(soundFile):
    command = 'aplay ' + soundFile
    global soundPlayer
    soundPlayer = subprocess.Popen(command.split())

def stopSound():
    soundPlayer.terminate()

def adjustQuestion(sentence):
    return sentence.lower().replace(' ', '').replace('　', '').replace('・', '').replace('_', '')

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
root.bind('<Return>', runFromShortcut)

whereAmI()
readDictionary()

mainFrame = tk.Frame(root, height=300)
mainFrame.pack(anchor=tk.NW, expand=1, fill=tk.BOTH)

controllerFrame = tk.Frame(mainFrame, height=100)
controllerFrame.pack(anchor=tk.NW, pady=5, expand=1, fill=tk.X)

requestBox = tk.Entry(controllerFrame)
requestBox.pack(anchor=tk.NW, side=tk.LEFT, expand=1, fill=tk.BOTH)

startButton = tk.Button(controllerFrame, text='実行', command=run)
startButton.pack(side=tk.LEFT, anchor=tk.NW)

stopFrame = tk.Frame(mainFrame, height=100)
stopFrame.pack(anchor=tk.NW, side=tk.TOP, expand=1, fill=tk.X)

stopButton = tk.Button(stopFrame, text='音楽をストップ', command=stopSound)
stopButton.pack(side=tk.LEFT, anchor=tk.NW)

resultFrame = tk.Frame(mainFrame)
resultFrame.pack(anchor=tk.NW, expand=1, fill=tk.BOTH)

resultBox = tk.Text(resultFrame)
resultBox.pack(side=tk.LEFT, anchor=tk.NW, expand=1, fill=tk.BOTH)
resultBox.insert('end', '>>>')


root.mainloop()