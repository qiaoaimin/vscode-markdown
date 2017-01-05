'use strict'

/**
 * Modified from https://github.com/hnw/vscode-auto-open-markdown-preview
 */
import { commands, window, workspace, ExtensionContext, TextDocument, TextEditor } from 'vscode';
import { log } from './util';

let currentDoc: TextDocument;

export function activate(context: ExtensionContext) {
    window.onDidChangeActiveTextEditor(editor => {
        log('EditorChanged', editor);
        if (editor && editor.document.languageId === 'markdown') {
            previewDoc(editor.document);
        }
    });

    log('activated');
    // The first time
    previewDoc(window.activeTextEditor.document);
}

function previewDoc(doc: TextDocument) {
    if (doc != currentDoc) {
        commands.executeCommand('markdown.showPreviewToSide');
        currentDoc = doc;
    }
}

// 1. Active status transfered by closing other editor will not fire 'onDidChangeActiveTextEditor'
// 2. How to reuse preview editor (i.e. do not open new tab for each md file)
