import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-meus-produtos',
  templateUrl: './meus-produtos.component.html',
  styleUrls: ['./meus-produtos.component.css']
})
export class MeusProdutosComponent implements OnInit {

  produto: Produto = new Produto();
  listaProdutos: Produto[];

  categoria: Categoria = new Categoria();
  listaCategorias: Categoria[];
  idCategoria: number;

  user: Usuario = new Usuario();
  idUsuario = environment.id;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0);
    if (environment.token == "") {
      alert("Sua sessão expirou");
      this.router.navigate(["/home"]);
    }
    
    this.findAllProdutos();
  }

  findAllProdutos() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp;
    });
  }

}
