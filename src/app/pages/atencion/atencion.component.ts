import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/clientes';
import { HistoriasService } from 'src/app/services/historias.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css']
})
export class AtencionComponent implements OnInit {

  constructor(private pacientesService: PacientesService, private historiasService: HistoriasService) { }

  checkCedula: any;
  checkNombre: any;
  buscadorCedula: boolean = true;
  buscadorNombre: boolean = false;
  inputBuscadorCedula: any;
  inputBuscadorNombre: any;
  pageActual: any = 1;
  maxPage: number = 30;
  clientes: Cliente[] = [];

  ngOnInit(): void {
    this.checkCedula = document.querySelector('#cbox1');
    this.checkNombre = document.querySelector('#cbox2');
  }

  cargarClientes() {
    this.inputBuscadorCedula = document.querySelector('#inputBuscadorCedula');
    this.inputBuscadorNombre = document.querySelector('#inputBuscadorNombre');
    this.pageActual = 1;
    this.clientes = [];
    if (this.buscadorCedula == true) {
      let parametroBusqueda = this.inputBuscadorCedula.value;
      if (parametroBusqueda == '') {
        parametroBusqueda = 'vacio';
        this.pacientesService.getClientesCedula(parametroBusqueda).subscribe(resp => {
          this.clientes = resp;
        });
      } else {
        this.pacientesService.getClientesCedula(parametroBusqueda).subscribe(resp => {
          this.clientes = resp;
        });
      }
    } else if (this.buscadorNombre == true) {
      let parametroBusqueda = this.inputBuscadorNombre.value;
      parametroBusqueda = parametroBusqueda.toUpperCase();
      let parametroFinal = `descrip LIKE '%`;
      for (let index = 0; index < parametroBusqueda.length; index++) {
        const element = parametroBusqueda[index];
        if (element != ' ') {
          parametroFinal = parametroFinal + element;
        } else {
          parametroFinal = parametroFinal + `%' AND descrip LIKE '%`;
        }
      }
      parametroFinal = parametroFinal + `%';`;
      const formData = {
        condicion: parametroFinal
      }
      if (parametroBusqueda == '') {
        parametroBusqueda = 'vacio';
        this.pacientesService.getClientesNombre(formData).subscribe(resp => {
          this.clientes = resp;
        });
      } else {
        this.pacientesService.getClientesNombre(formData).subscribe(resp => {
          this.clientes = resp;
        });
      }
    }

  }

  onEnter() {
    this.cargarClientes();
  }

  cambiarBuscador(check: string) {
    switch (check) {
      case 'nombre':
        this.buscadorCedula = false;
        this.buscadorNombre = true;
        break;
      case 'cedula':
        this.buscadorCedula = true;
        this.buscadorNombre = false;
        break;
      default:
        break;
    }
  }

  cargarHistoria(ciu_per: number) {
    this.historiasService.getHistoriasPorId(ciu_per).subscribe(resp => {
      if (resp.length == 0) {
        Swal.fire({
          title: 'El paciente no tiene historia clinica, desea crearla?',
          showDenyButton: true,
          confirmButtonText: 'Crear',
          denyButtonText: `Salir`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            const formData = {
              ciu_per: ciu_per
            }
            this.historiasService.postHistoria(formData).subscribe(respHistoria => {
              console.log(respHistoria);
              Swal.fire('La historia fue creada correctamente', '', 'success');
            });
          } else if (result.isDenied) {
            Swal.fire('La historia no fue creada', '', 'info')
          }
        })
      } else {
        console.log('Cargando datos...');
      }

    })
  }
}
