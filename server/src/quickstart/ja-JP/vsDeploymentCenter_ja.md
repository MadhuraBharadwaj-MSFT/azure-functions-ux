# 依存関係のインストール

作業を開始する前に、[Visual Studio 2017 をインストール](https://go.microsoft.com/fwlink/?linkid=2016389)する必要があります。また、Azure 開発ワークロードもインストールされていることを確認する必要があります。

Visual Studio がインストールされたら、[最新の Azure Functions ツール](https://go.microsoft.com/fwlink/?linkid=2016394)があることを確認します。

<br/>
# Azure Functions プロジェクトの作成

Visual Studio で、**\[ファイル]** メニューから **\[新規作成]** > **\[プロジェクト]** を選択します。

**\[新しいプロジェクト]** ダイアログで、**\[インストール済み]** を選択し、**\[Visual C#]** > **\[クラウド]** の順に展開し、**\[Azure Functions]** を選択し、プロジェクトの **\[名前]** を入力して、**\[OK]** をクリックします。関数アプリ名は C# 名前空間として有効である必要があるため、アンダースコアやハイフンなどの英数字以外の文字は使用しないでください。

ウィザードに従ってテンプレートを選択し、カスタマイズします。手始めに HTTP をお勧めします。次に、**\[OK]** をクリックして、最初の関数を作成します。

<br/>
# 関数の作成

プロジェクトを作成すると、既定で HTTP 関数が作成されるため、この手順では何もする必要はありません。後で新しい関数を追加する場合は、**\[ソリューション エクスプローラー]** でプロジェクトを右クリックし、**\[追加]** > **\[新しい Azure 関数…]** を選択します。

関数に名前を付け、**\[追加]** をクリックします。テンプレートを選択してカスタマイズし、**\[OK]** をクリックします。

<br/>
# 関数プロジェクトをローカルで実行する

**F5** キーを押して、関数アプリを実行します。

ランタイムにより、HTTP 関数の URL が出力されます。これをブラウザーのアドレス バーにコピーすれば、実行できます。

デバッグを停止するには、**Shift + F5** キーを押します。

<br/>
# コードを Azure にデプロイする

下にある **\[終了して、デプロイ センターに移動する]** を使用してデプロイ センターに移動し、アプリの設定を完了します。これにより新しいウィザードが開始され、さまざまなデプロイ オプションを構成します。このフローを完了した後、構成したいずれかのメカニズムを使用してデプロイをトリガーします。