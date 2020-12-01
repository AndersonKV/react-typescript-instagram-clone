# react-typescript-instagram-clone


Projeto feito usando typescript no back e no front, react, node js, express, jwt e bcrypt


<b>Features</b>

<ul>
    <li>Autenticação</li>
    <ul>
        <li>Rotas autenticadas, se o usuario não estiver com o token auto gerado, não vai poder acessar as rotas privadas<br> esse token é verificado
        sempre que ele acessa uma rota privada com autenticação no backend e no front</li>
        <li>Caso a rota não exista exibi page not found error 404</li>
        <li>Tratamento de errors, caso não tenha token ou token mal formatado, usuario não encontrado etc</li>
    </ul>
</ul>


<ul>
    <li>Postar foto</li>
    <ul>
        <li>Pode postar até 5 fotos</li>
        <li>Ao postar a hashtag o texto ja foi formatado para fazer a busca, basta apenas clicar</li>
        <li>Curtir foto</li>
        <li>Comentar</li>
        <li>Na rota /app ao clicar no canto superior direito da postagem é possivel excluir a mesma se for o usuario quem posto</li>
        <li>Exibir todos os likes e comentarios</li>
    </ul>
</ul>

<ul>
    <li>Usuarios</li>
    <ul>
        <li>Cadastrar usuario, verifica se usuario unico já está em uso, verifica se o hash da senha bate com a senha</li>
        <li>Verifica se email ou senha está errado ao entrar e exibi mensagem do error<li>
        <li>É possivel entrar usando usuario ou email + senha</li>
        <li>Seguir usuarios</li>
        <li>Ao clicar no icone da foto do usuario que fica no header, vai para rota profile e ao passar a mão nas fotos<br>
        exibi a quantidade de like e comentario</li>
        <li>Ao entrar, se existir usuarios cadastrado, ele exibi como recomendação, menos o proprio usuario</li>
        <li>Editar as informações pessoal, como senha, foto, email e usuario, alem de verifica se já existe e é possivel alterar</li>
        <li>Ao clicar em seguidores/seguindo exibe os usuarios que estão seguindo</li>
        <li>Na Timeline exibe as ultimas postagens dos usuarios que seguiu</li>
    </ul>
</ul>

<ul>
    <li>Buscas</li>
    <ul>
        <li>Digitando # com palavra desajada exibe todos os posts que contem essa #</li>
        <li>Digitando o nome do usuario exibe se ele existe ou não</li>
        <li>Se não existir nada relacionado ele exibi "nada foi encontrado"</li>
    </ul>
</ul>


<img src="test.gif"/>

<h4>Parar rodar o projeto baixe os arquivos e na pasta raiz de cada pasta digite no terminal yarn install ou npm install, baixando assim suas dependencias, depois na pasta web, yarn start, no backend, yarn dev</h4>
    
