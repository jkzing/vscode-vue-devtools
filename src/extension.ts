'use strict'
import * as vscode from 'vscode'
import { createVueDevtoolsPanel } from './webview/vueDevtools'

export function activate(context: vscode.ExtensionContext) {
  let devtoolsPanel: vscode.WebviewPanel | null = null

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.openVueDevtools', () => {
      if (!devtoolsPanel) {
        devtoolsPanel = createVueDevtoolsPanel(context)

        devtoolsPanel.onDidDispose(
          () => { devtoolsPanel = null },
          null,
          context.subscriptions
        )
      } else {
        devtoolsPanel.reveal()
      }
    })
  )
}

export function deactivate() {}
