# README

Este projeto demonstra a criação de um aplicativo de tarefas simples ("Todo App") utilizando a biblioteca Wails em Golang. O Wails permite a construção de apps desktop multiplataforma com Go e tecnologias web, oferecendo uma alternativa leve e rápida ao Electron.


### Comandos:

- `wails`: Este comando é usado para interagir com o CLI do Wails. Ele oferece várias opções, como construir a aplicação, iniciar o servidor de desenvolvimento e executar testes.

- `wails dev`: Este comando inicia o ambiente de desenvolvimento do Wails, que permite que você veja as alterações no código em tempo real.
- `wails build`: Este comando compila sua aplicação Wails para um executável.

### Estrutura do projeto
```
├── frontend
│   └── src
│       └── main.tsx
├── internal
|   └── ...
├── main.go
└── wails.json

```

### Dependências:

- [Wails](https://wails.io/)

### Instalação:

```sh
go install github.com/wailsapp/wails/v2/cmd/wails@latest

cd frontend && npm install
cd ..
```

### Construção:

```sh
wails build
```

### Execução:

No Linux:
```sh
chmod +x build/bin/go-todo
./build/bin/go-todo
```



### Recursos:

- [Documentação do Wails](https://wails.io/docs/introduction)
- [Exemplos do Wails](https://github.com/wailsapp/awesome-wails)