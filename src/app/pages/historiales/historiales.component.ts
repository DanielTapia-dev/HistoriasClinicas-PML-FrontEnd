import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/clientes';
import { HistoriasService } from 'src/app/services/historias.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent implements OnInit {

  clienteSeleccionado: any = {
    cedruc: '',
    descrip: '',
    direcci: '',
    email1: '',
    seq_ciu: '',
    telefon1: ''
  };
  historiaSeleccionada: any;
  historiaBasePropia: any = {

  };
  buscadorCedula: boolean = true;
  buscadorNombre: boolean = false;
  inputBuscadorCedula: any;
  inputBuscadorNombre: any;
  pageActual: any = 1;
  maxPage: number = 30;
  clientes: Cliente[] = [];
  ciuCliente: any = '';
  cliente: any = {};

  //Objetos HTML
  checkCedula: any;
  checkNombre: any;
  selectTipoSangre: any;
  orientacionSexual: any;
  discapacidad: any;
  edad: any;
  edadNueva: any;
  btnAgregarConsulta: any;
  tablaNuevaConsulta: any;
  motivoConsulta: any;
  antecedentes: any;
  signosVitales: any;
  examenFisico: any;
  diagnostico: any;
  tratamiento: any;
  btnMontivoConsulta: any;
  btnAntecedentes: any;
  btnSignosVitales: any;
  btnExamenFisico: any;
  btnDiagnostico: any;
  btnTratamiento: any;

  constructor(private pacientesService: PacientesService, private historiasService: HistoriasService) { }

  ngOnInit(): void {
    this.checkCedula = document.querySelector('#cbox1');
    this.checkNombre = document.querySelector('#cbox2');
    this.btnAgregarConsulta = document.querySelector('#btnAgregarConsulta');
    this.tablaNuevaConsulta = document.querySelector('#tablaNuevaConsulta');
    this.motivoConsulta = document.querySelector('#motivoConsulta');
    this.antecedentes = document.querySelector('#antecedentes');
    this.signosVitales = document.querySelector('#signosVitales');
    this.examenFisico = document.querySelector('#examenFisico');
    this.diagnostico = document.querySelector('#diagnostico');
    this.tratamiento = document.querySelector('#tratamiento');
    this.btnMontivoConsulta = document.querySelector('#btnMontivoConsulta');
    this.btnAntecedentes = document.querySelector('#btnAntecedentes');
    this.btnSignosVitales = document.querySelector('#btnSignosVitales');
    this.btnExamenFisico = document.querySelector('#btnExamenFisico');
    this.btnDiagnostico = document.querySelector('#btnDiagnostico');
    this.btnTratamiento = document.querySelector('#btnTratamiento');
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
      let parametroFinal = `CLi.descrip LIKE '%`;
      for (let index = 0; index < parametroBusqueda.length; index++) {
        const element = parametroBusqueda[index];
        if (element != ' ') {
          parametroFinal = parametroFinal + element;
        } else {
          parametroFinal = parametroFinal + `%' AND Cli.descrip LIKE '%`;
        }
      }
      parametroFinal = parametroFinal + `%'`;
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
    this.clienteSeleccionado = {
      cedruc: '',
      descrip: '',
      direcci: '',
      email1: '',
      seq_ciu: '',
      telefon1: ''
    };
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

  cargarHistoria(ciu_per: number, cliente: any) {
    this.ciuCliente = ciu_per;
    this.cliente = cliente;
    this.pacientesService.getHistoriales(ciu_per).subscribe(resp => {
      console.log(resp);
      if (resp.length == 0) {
        this.clienteSeleccionado = {
          cedruc: '',
          descrip: '',
          direcci: '',
          email1: '',
          seq_ciu: '',
          telefon1: ''
        };
        this.historiaSeleccionada = {};
        Swal.fire('La historia clinica aún no ha sido creada', '', 'error');
      } else {
        this.clienteSeleccionado = cliente;
        this.historiaSeleccionada = resp[0];
        if (this.historiaSeleccionada.genero == 1) {
          this.historiaSeleccionada = {
            ...this.historiaSeleccionada,
            genero: 'Masculino'
          }
        } else {
          this.historiaSeleccionada = {
            ...this.historiaSeleccionada,
            genero: 'Femenino'
          }
        }
        console.log(this.historiaSeleccionada.fechanac);
        this.historiaBasePropia.grupo_sanguineo = '';
        this.historiasService.getHistoriasPorId(ciu_per).subscribe(respHistoriaPropia => {
          if (respHistoriaPropia.length == 0) {
            const formData = {
              ciu_per: ciu_per,
              nrohistoria: this.historiaSeleccionada.nrohistoria,
              sexo: this.historiaSeleccionada.genero,
              discapacidad: 'NO',
              orientacion_sexual: 'Heterosexual',
              grupo_sanguineo: 'NN',
              fecha_nacimiento: this.historiaSeleccionada.fechanac
            }
            this.historiasService.postHistoria(formData).subscribe(respHistoria => {
              this.historiaBasePropia = respHistoria;
              this.selectTipoSangre = document.querySelector('#tipoSangre');
              this.selectTipoSangre.value = this.historiaBasePropia.grupo_sanguineo;
              this.orientacionSexual = document.querySelector('#orientacionSexual');
              this.orientacionSexual.value = this.historiaBasePropia.orientacion_sexual;
              this.discapacidad = document.querySelector('#discapacidad');
              this.discapacidad.value = this.historiaBasePropia.discapacidad;
              this.edadNueva = document.querySelector('#edad');
            });
          } else {
            this.historiaBasePropia = respHistoriaPropia[0];
            this.selectTipoSangre = document.querySelector('#tipoSangre');
            this.selectTipoSangre.value = this.historiaBasePropia.grupo_sanguineo;
            this.orientacionSexual = document.querySelector('#orientacionSexual');
            this.orientacionSexual.value = this.historiaBasePropia.orientacion_sexual;
            this.discapacidad = document.querySelector('#discapacidad');
            this.discapacidad.value = this.historiaBasePropia.discapacidad;
            this.edadNueva = document.querySelector('#edad');
          }
        })
      }
    })
  }

  cambiarHistoria(parametroDeCambio: string) {
    Swal.fire({
      title: 'Esta seguro de cambiar los datos del paciente?',
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `Salir`,
    }).then((result) => {
      // Read more about isConfirmed, isDenied below 
      if (result.isConfirmed) {
        if (parametroDeCambio == 'grupo_sanguineo') {
          this.historiasService.putHistoria(this.selectTipoSangre.value, this.historiaBasePropia.id, parametroDeCambio).subscribe(resp => {
            Swal.fire(`${resp.mensaje}`, '', 'success');
          });
        } else if (parametroDeCambio == 'discapacidad') {
          this.historiasService.putHistoria(this.discapacidad.value, this.historiaBasePropia.id, parametroDeCambio).subscribe(resp => {
            Swal.fire(`${resp.mensaje}`, '', 'success');
          });
        } else if (parametroDeCambio == 'orientacion_sexual') {
          this.historiasService.putHistoria(this.orientacionSexual.value, this.historiaBasePropia.id, parametroDeCambio).subscribe(resp => {
            Swal.fire(`${resp.mensaje}`, '', 'success');
          });
        }
      } else if (result.isDenied) {
        this.cargarHistoria(this.ciuCliente, this.cliente);
        Swal.fire('Los datos no fueron cambiados', '', 'info')
      }
    })
  }

}
