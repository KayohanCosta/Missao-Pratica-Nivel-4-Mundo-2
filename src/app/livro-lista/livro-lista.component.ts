import { Component, OnInit } from '@angular/core';
import { Editora } from '../editora';
import { Livro } from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrl: './livro-lista.component.css',
})
export class LivroListaComponent implements OnInit {
  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];

  private servEditora: ControleEditoraService;
  private servLivros: ControleLivrosService;

  constructor(
    servEditora: ControleEditoraService,
    servLivros: ControleLivrosService
  ) {
    this.servEditora = servEditora;
    this.servLivros = servLivros;
  }

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
    this.livros = this.servLivros.obterLivros();
    console.log('LISTA: \n', this.livros);
  }

  excluir = (codigo: number) => {
    this.servLivros.excluir(codigo);
    this.servLivros.obterLivros();
  };

  obterNome = (codEditora: number) => {
    return this.servEditora.getNomeEditora(codEditora);
  };
}
