import SigninForm from '../SigninForm';
import { PageHomeProps } from './PageHome.types';
export default function PageHome(props: PageHomeProps) {
  // const {} = props
  return (
    <>
      <header>
        <h1>Bem-vindo à Minha Landing Page</h1>
        <nav>
          <ul>
            <li>
              <a href="#sobre">Sobre</a>
            </li>
            <li>
              <a href="#servicos">Preço</a>
            </li>
            <li>
              <a href="#contato">Duvidas</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="">
        <section>
          <SigninForm />
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
