'usr strict'

import * as vscode from 'vscode';
import * as assert from 'assert';

import fs = require('fs');
import path = require('path');

const TEST_DATA_DIR = "../../test/testdata"
const timelag = () => new Promise(resolve => setTimeout(resolve, 300));

export function getFilePath(fileName: string): string{
    return path.join(__dirname, TEST_DATA_DIR, fileName);
}

export function test(command: string, src: string, expected: string, selection: vscode.Selection) {
       const newFile = getFilePath(src);
       const expectedFile = getFilePath(expected);
       const expectedText = fs.readFileSync(expectedFile, 'utf-8');
       return vscode.workspace.openTextDocument(newFile)
            .then(doc => vscode.window.showTextDocument(doc))
            .then(() => {
                const editor = vscode.window.activeTextEditor;
                editor.selection = selection;
            })
            .then(() => vscode.commands.executeCommand(command))
            .then(timelag)
            .then(() => {
                const editor = vscode.window.activeTextEditor;
                assert(editor.document.getText() === expectedText);
            })
}
