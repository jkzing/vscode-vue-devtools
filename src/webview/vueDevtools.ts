import * as vscode from 'vscode'
import * as path from 'path'

export interface Externals {
  vueRemotedevApp: vscode.Uri
}

export interface DevtoolOptions {
  host: string
  port: string
}

export function createVueDevtoolsPanel(
  context: vscode.ExtensionContext
): vscode.WebviewPanel {
  const settings = vscode.workspace.getConfiguration('vue-devtools')
  const socketOptions: DevtoolOptions = {
    host: settings.host || 'http://localhost',
    port: settings.port || 8000
  }

  const panel = vscode.window.createWebviewPanel(
    'vscode-vue-devtools',
    'Vue Devtools',
    vscode.ViewColumn.Two,
    { enableScripts: true }
  )

  const vueRemotedevAppPath = vscode.Uri.file(
    path.join(context.extensionPath, 'externals', 'vue-remotedev-app.min.js')
  )

  const pathOpts = { scheme: 'vscode-resource' }
  const externalSrc = {
    vueRemotedevApp: vueRemotedevAppPath.with(pathOpts)
  }

  panel.webview.html = getDevtoolContent(externalSrc, socketOptions)

  return panel
}

export function getDevtoolContent(
  externals: Externals,
  socketOptions: DevtoolOptions
) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Vue Devtools</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="renderer" content="webkit" />
    <style>
      html,
      body,
      #app {
        width: 100%;
        height: 100%;
      }

      body {
        padding: 0!important;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script src="${externals.vueRemotedevApp}"></script>
  <script>
    console.log(VueRemotedevApp)
    VueRemotedevApp.renderDevtools()
  </script>
</html>`
}
