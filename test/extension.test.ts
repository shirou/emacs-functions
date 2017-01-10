import * as assert from 'assert';
import * as vscode from 'vscode';

import sinon = require('sinon');

import * as em from '../src/extension';

import * as util from './util';

suite("killring Tests", () => {
    let extension: vscode.Extension<em.ExtensionInternal>;
    let internals: em.ExtensionInternal;
    setup(done => {
        extension = vscode.extensions.getExtension("rrudi.emacs-functions");
        extension.activate().then(v => {
            internals = v;
            done();
        });
    });

    test("Cut", done => {
        const s = new vscode.Position(1, 0);
        const e = new vscode.Position(2, 0);
        const newSelection = new vscode.Selection(e, s);
        util.test("extension.emacs.kill-region", "cut-src.txt", "cut-expected.txt", newSelection)
        .then(() => {
            const editor = vscode.window.activeTextEditor;
            assert(editor.selection.start.line === 1);
            assert(editor.selection.start.character === 0);
            assert(editor.selection.end.line === 1);
            assert(editor.selection.end.character === 0);

            done();
        })
    });
});