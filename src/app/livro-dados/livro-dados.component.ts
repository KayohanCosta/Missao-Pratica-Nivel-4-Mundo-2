import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleLivrosService } from '../controle-livros.service';
import { ControleEditoraService } from '../controle-editora.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrl: './livro-dados.component.css',
})
export class LivroDadosComponent implements OnInit {
  public livro: Livro;
  public autoresForm: string = '';
  public editoras: Array<Editora> = [];

  private router: Router;
  private servLivros: ControleLivrosService;
  private servEditora: ControleEditoraService;

  constructor(
    router: Router,
    servLivros: ControleLivrosService,
    servEditora: ControleEditoraService
  ) {
    this.livro = new Livro(0, 0, '', '', []);
    this.router = router;
    this.servLivros = servLivros;
    this.servEditora = servEditora;
  }

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }

  incluir = () => {
    this.livro.autores = this.autoresForm.split('\n');
    this.livro.codEditora = Number(this.livro.codEditora);
    this.servLivros.incluir(this.livro);
    console.log(
      this.livro,
      ' - ',
      this.servEditora.getNomeEditora(this.livro.codEditora)
    );
    this.router.navigateByUrl('/lista');
  };
}
