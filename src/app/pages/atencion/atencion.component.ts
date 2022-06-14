import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/models/clientes';
import { Condicion } from 'src/app/models/condicion';
import { Consulta } from 'src/app/models/consulta';
import { Cronologia } from 'src/app/models/cronologia';
import { Diagnostico } from 'src/app/models/diagnostico';
import { Tipo } from 'src/app/models/tipo';
import { AuthService } from 'src/app/services/auth.service';
import { CondicionService } from 'src/app/services/condicion.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { CronologiaService } from 'src/app/services/cronologia.service';
import { DiagnosticosService } from 'src/app/services/diagnosticos.service';
import { HistoriasService } from 'src/app/services/historias.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { TipoService } from 'src/app/services/tipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css']
})
export class AtencionComponent implements OnInit {

  constructor(private pacientesService: PacientesService, private historiasService: HistoriasService, private authService: AuthService, private consultasService: ConsultasService,
    private diagnosticosService: DiagnosticosService, private cronologiasService: CronologiaService, private condicionesService: CondicionService, private tipoService: TipoService) { }

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
  cronologias: Cronologia[] = [];
  condiciones: Condicion[] = [];
  tipos: Tipo[] = [];
  empleado: any;
  ciuCliente: any = '';
  cliente: any = {};
  consultas: Consulta[] = [];
  enfermedadesCie: Diagnostico[] = [];
  fechaConsulta: string = '';
  idConsultaActual: number = 0;
  buscadorCie10: boolean = true;

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
  inputPeso: any;
  inputTalla: any;
  inputImc: any;
  inputPrsist: any;
  inputPrdist: any;
  inputtemp: any;
  inputFc: any;
  inputSat: any;
  inputFr: any;
  btnHistorialClinico: any;
  btnHistorialClinico2: any;
  tablaHistorialMedico: any;
  tablaUpdateConsulta: any;
  inputMotivoConsulta: any;
  textEnfermedadActual: any;
  textEnfermedadActualDiagnostico: any;
  textEnfermedadActualDiagnosticoDescripcion: any;
  textAntecedentes: any;
  textExamenFisico: any;
  textResultadosExamenes: any;
  inputBuscadorCodigoCie10: any;
  inputBuscadorDescripcionCie10: any;
  inputDiagnostico: any;
  textEnfermedadActualTratamiento: any;
  selectCodigoCie10: any;
  selectDescripcionCie10: any;
  labelDescipcionCie10: any;
  inputCodigoCie: any;
  inputDescripcionCie: any;
  checkCodigoCie10: any;
  checkCodigoDescripcion: any;
  selectCronologia: any;
  selectCondicion: any;
  selectTipo: any;
  textObservacionDiagnostico: any;
  textTratamiento: any;

  ngOnInit(): void {
    this.empleado = this.authService.usuario.usuario;
    this.cargarCronologias();
    this.cargarCondiciones();
    this.cargarTipos();
    this.checkCedula = document.querySelector('#cbox1');
    this.checkNombre = document.querySelector('#cbox2');
    this.btnAgregarConsulta = document.querySelector('#btnAgregarConsulta');
    this.btnHistorialClinico = document.querySelector('#btnHistorialClinico');
    this.btnHistorialClinico2 = document.querySelector('#btnHistorialClinico2');
    this.tablaNuevaConsulta = document.querySelector('#tablaNuevaConsulta');
    this.tablaUpdateConsulta = document.querySelector('#tablaUpdateConsulta');
    this.tablaHistorialMedico = document.querySelector('#tablaHistorialMedico');
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

  cargarDiagnosticos(id: string) {
    this.diagnosticosService.getConsultas(id).subscribe(resp => {
      this.enfermedadesCie = resp;
      this.asignarTextDiagnostico(this.enfermedadesCie[0].codigo_cie10);
      this.cambiarLabel(this.enfermedadesCie[0].codigo_cie10);
    });
  }

  cargarDiagnosticosDescripcion(id: string) {
    this.diagnosticosService.getConsultasDescripcion(id).subscribe(resp => {
      this.enfermedadesCie = resp;
      this.asignarTextDiagnostico(this.enfermedadesCie[0].codigo_cie10);
      this.cambiarLabel(this.enfermedadesCie[0].codigo_cie10);
    });
  }

  cambiarLabel(codigo: any) {
    this.labelDescipcionCie10 = document.querySelector('#labelDescipcionCie10');
    this.selectDescripcionCie10 = document.querySelector('#selectDescripcionCie10');
    if (codigo == '') {
      this.labelDescipcionCie10 = document.querySelector('#labelDescipcionCie10');
      this.textEnfermedadActualDiagnosticoDescripcion = document.querySelector('#textEnfermedadActualDiagnosticoDescripcion');
      this.labelDescipcionCie10.value = this.selectDescripcionCie10.value;
      this.labelDescipcionCie10.innerHTML = `Código: ${this.selectDescripcionCie10.value}`;
      this.diagnosticosService.getDescripcion(this.labelDescipcionCie10.value).subscribe(resp => {
        this.textEnfermedadActualDiagnosticoDescripcion.value = resp.descripcion;
      });
    } else {
      this.labelDescipcionCie10 = document.querySelector('#labelDescipcionCie10');
      this.textEnfermedadActualDiagnosticoDescripcion = document.querySelector('#textEnfermedadActualDiagnosticoDescripcion');
      this.labelDescipcionCie10.value = this.selectDescripcionCie10.value;
      this.labelDescipcionCie10.innerHTML = `Código: ${codigo}`;
      this.diagnosticosService.getDescripcion(codigo).subscribe(resp => {
        this.textEnfermedadActualDiagnosticoDescripcion.value = resp.descripcion;
      });
    }
  }

  onEnter() {
    this.cargarClientes();
    this.btnAgregarConsulta.classList.add('hidden');
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

  cambiarBuscadorCie10(check: string) {
    this.inputBuscadorCodigoCie10 = document.querySelector('#inputBuscadorCodigoCie10');
    this.inputBuscadorDescripcionCie10 = document.querySelector('#inputBuscadorDescripcionCie10');
    this.selectCodigoCie10 = document.querySelector('#selectCodigoCie10');
    this.selectDescripcionCie10 = document.querySelector('#selectDescripcionCie10');
    this.labelDescipcionCie10 = document.querySelector('#labelDescipcionCie10');
    switch (check) {
      case 'codigo':
        this.inputBuscadorCodigoCie10.classList.remove('hidden');
        this.inputBuscadorDescripcionCie10.classList.add('hidden');
        this.selectCodigoCie10.classList.remove('hidden');
        this.selectDescripcionCie10.classList.add('hidden');
        this.labelDescipcionCie10.classList.add('hidden');
        this.buscadorCie10 = true;
        break;
      case 'descripcion':
        this.inputBuscadorDescripcionCie10.classList.remove('hidden');
        this.inputBuscadorCodigoCie10.classList.add('hidden');
        this.selectCodigoCie10.classList.add('hidden');
        this.selectDescripcionCie10.classList.remove('hidden');
        this.labelDescipcionCie10.classList.remove('hidden');
        this.buscadorCie10 = false;
        break;
      default:
        break;
    }
  }

  cargarHistoria(ciu_per: number, cliente: any) {
    this.encerarInputs();
    this.ciuCliente = ciu_per;
    this.cliente = cliente;
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

    this.tablaNuevaConsulta.classList.add('hidden');
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
              this.cargarConsultas();
              this.selectTipoSangre = document.querySelector('#tipoSangre');
              this.selectTipoSangre.value = this.historiaBasePropia.grupo_sanguineo;
              this.orientacionSexual = document.querySelector('#orientacionSexual');
              this.orientacionSexual.value = this.historiaBasePropia.orientacion_sexual;
              this.discapacidad = document.querySelector('#discapacidad');
              this.discapacidad.value = this.historiaBasePropia.discapacidad;
              this.edadNueva = document.querySelector('#edad');
              console.log('Primera');
            });
          } else {
            this.historiaBasePropia = respHistoriaPropia[0];
            this.cargarConsultas();
            this.selectTipoSangre = document.querySelector('#tipoSangre');
            this.selectTipoSangre.value = this.historiaBasePropia.grupo_sanguineo;
            this.orientacionSexual = document.querySelector('#orientacionSexual');
            this.orientacionSexual.value = this.historiaBasePropia.orientacion_sexual;
            this.discapacidad = document.querySelector('#discapacidad');
            this.discapacidad.value = this.historiaBasePropia.discapacidad;
            this.edadNueva = document.querySelector('#edad');
            console.log('Segunda');
          }
        })
        this.btnAgregarConsulta.classList.remove('hidden');
        this.abrirTablaHistorial();
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

  abrirTablaNuevaConsulta() {
    let fechaActual = new Date();
    this.fechaConsulta = '';
    for (let i = 0; i < 10; i++) {
      const element = fechaActual.toISOString().toString()[i];
      this.fechaConsulta = this.fechaConsulta + element;
    }
    this.tablaNuevaConsulta.classList.remove('hidden');
    this.btnAgregarConsulta.classList.add('hidden');
    this.tablaHistorialMedico.classList.add('hidden');
    this.btnHistorialClinico.classList.remove('hidden');
  }

  abrirTablaUpdateConsulta() {
    this.tablaNuevaConsulta.classList.remove('hidden');
    this.btnAgregarConsulta.classList.add('hidden');
    this.tablaHistorialMedico.classList.add('hidden');
    this.btnHistorialClinico.classList.remove('hidden');
  }

  onEnterCIE10() {
    if (this.buscadorCie10 == true) {
      this.inputCodigoCie = document.querySelector('#inputCodigoCie');
      this.cargarDiagnosticos(this.inputCodigoCie.value);
    } else {
      this.inputDescripcionCie = document.querySelector('#inputDescripcionCie');
      this.cargarDiagnosticosDescripcion(this.inputDescripcionCie.value);
    }
  }

  asignarTextDiagnostico(codigo: any) {
    if (codigo == '') {
      this.textEnfermedadActualDiagnostico = document.querySelector('#textEnfermedadActualDiagnostico');
      this.selectCodigoCie10 = document.querySelector('#selectCodigoCie10');
      console.log(this.selectCodigoCie10.value);
      this.diagnosticosService.getDescripcion(this.selectCodigoCie10.value).subscribe(resp => {
        this.textEnfermedadActualDiagnostico.value = resp.descripcion;
      });
    } else {
      this.textEnfermedadActualDiagnostico = document.querySelector('#textEnfermedadActualDiagnostico');
      this.selectCodigoCie10 = document.querySelector('#selectCodigoCie10');
      console.log(this.selectCodigoCie10.value);
      this.diagnosticosService.getDescripcion(codigo).subscribe(resp => {
        this.textEnfermedadActualDiagnostico.value = resp.descripcion;
      });
    }
  }

  cargarCronologias() {
    this.cronologiasService.getCronologiasActivas().subscribe(resp => {
      this.cronologias = resp;
    })
  }

  cargarCondiciones() {
    this.condicionesService.getCondiciones().subscribe(resp => {
      this.condiciones = resp;
    })
  }

  cargarTipos() {
    this.tipoService.getTipos().subscribe(resp => {
      this.tipos = resp;
    })
  }

  encerarTextos() {
    try {
      /* Motivo de consulta */
      this.inputMotivoConsulta = document.querySelector('#inputMotivoConsulta');
      this.textEnfermedadActual = document.querySelector('#textEnfermedadActual');

      /* Antecedentes */
      this.textAntecedentes = document.querySelector('#textAntecedentes');

      /* Signos Vitales */
      this.inputPeso = document.querySelector('#peso');
      this.inputTalla = document.querySelector('#talla');
      this.inputImc = document.querySelector('#imc');
      this.inputPrsist = document.querySelector('#prsist');
      this.inputPrdist = document.querySelector('#prdist');
      this.inputtemp = document.querySelector('#temp');
      this.inputFc = document.querySelector('#fc');
      this.inputFr = document.querySelector('#fr');
      this.inputSat = document.querySelector('#sat');

      /* Examen Fisico */
      this.textExamenFisico = document.querySelector('#textExamenFisico');
      this.textResultadosExamenes = document.querySelector('#textResultadosExamenes');

      /* Diagnostico */
      this.checkCodigoCie10 = document.querySelector('#checkCodigoCie10');

      if (this.checkCodigoCie10.checked == true) {
        this.selectCodigoCie10 = document.querySelector('#selectCodigoCie10');
      } else {
        this.selectCodigoCie10 = document.querySelector('#selectDescripcionCie10');
      }

      this.selectCronologia = document.querySelector('#selectCronologia');
      this.selectCondicion = document.querySelector('#selectCondicion');
      this.selectTipo = document.querySelector('#selectTipo');
      this.textObservacionDiagnostico = document.querySelector('#textObservacionDiagnostico');
      this.textTratamiento = document.querySelector('#textTratamiento');
      /* Motivo de consulta */
      this.inputMotivoConsulta.value = '';
      this.textEnfermedadActual.value = '';

      /* Antecedentes */
      this.textAntecedentes.value = '';

      /* Signos Vitales */
      this.inputPeso.value = '';
      this.inputTalla.value = '';
      this.inputImc.value = '';
      this.inputPrsist.value = '';
      this.inputPrdist.value = '';
      this.inputtemp.value = '';
      this.inputFc.value = '';
      this.inputFr.value = '';
      this.inputSat.value = '';

      /* Examen Fisico */
      this.textExamenFisico.value = '';
      this.textResultadosExamenes.value = '';

      /* Diagnostico */
      this.checkCodigoCie10.value = '';

      if (this.checkCodigoCie10.checked == true) {
        this.selectCodigoCie10.value = '';
      } else {
        this.selectCodigoCie10.value = '';
      }

      this.selectCronologia.value = '';
      this.selectCondicion.value = '';
      this.selectTipo.value = '';
      this.textObservacionDiagnostico.value = '';
      this.textTratamiento.value = '';
    } catch (error) {
      console.log('Aun no existen textos abiertos');
    }
  }

  guardarConsultaMedico() {

    console.log(this.idConsultaActual);
    /* Motivo de consulta */
    this.inputMotivoConsulta = document.querySelector('#inputMotivoConsulta');
    this.textEnfermedadActual = document.querySelector('#textEnfermedadActual');

    /* Antecedentes */
    this.textAntecedentes = document.querySelector('#textAntecedentes');

    /* Signos Vitales */
    this.inputPeso = document.querySelector('#peso');
    this.inputTalla = document.querySelector('#talla');
    this.inputImc = document.querySelector('#imc');
    this.inputPrsist = document.querySelector('#prsist');
    this.inputPrdist = document.querySelector('#prdist');
    this.inputtemp = document.querySelector('#temp');
    this.inputFc = document.querySelector('#fc');
    this.inputFr = document.querySelector('#fr');
    this.inputSat = document.querySelector('#sat');

    /* Examen Fisico */
    this.textExamenFisico = document.querySelector('#textExamenFisico');
    this.textResultadosExamenes = document.querySelector('#textResultadosExamenes');

    /* Diagnostico */
    this.checkCodigoCie10 = document.querySelector('#checkCodigoCie10');

    if (this.checkCodigoCie10.checked == true) {
      this.selectCodigoCie10 = document.querySelector('#selectCodigoCie10');
    } else {
      this.selectCodigoCie10 = document.querySelector('#selectDescripcionCie10');
    }

    this.selectCronologia = document.querySelector('#selectCronologia');
    this.selectCondicion = document.querySelector('#selectCondicion');
    this.selectTipo = document.querySelector('#selectTipo');
    this.textObservacionDiagnostico = document.querySelector('#textObservacionDiagnostico');
    this.textTratamiento = document.querySelector('#textTratamiento');

    if (this.selectCodigoCie10.value) {
      this.selectCodigoCie10.value = null;
    }

    let consultaNueva = {
      id: this.idConsultaActual,
      peso: this.inputPeso.value,
      talla: this.inputTalla.value,
      imc: this.inputImc.value,
      prsist: this.inputPrsist.value,
      prdist: this.inputPrdist.value,
      temp: this.inputtemp.value,
      fc: this.inputFc.value,
      sat: this.inputSat.value,
      fr: this.inputFr.value,
      observacion_signos: this.textObservacionDiagnostico.value,
      motivo_atencion: this.inputMotivoConsulta.value,
      enfermedad_actual: this.textEnfermedadActual.value,
      antecedentes: this.textAntecedentes.value,
      examen_fisico: this.textExamenFisico.value,
      resultados_examenes: this.textResultadosExamenes.value,
      tratamiento: this.textTratamiento.value,
      codigo_cie10_per: this.selectCodigoCie10.value,
      id_cronologia_per: this.selectCronologia.value,
      id_condicion_per: this.selectCondicion.value,
      id_tipo_per: this.selectTipo.value,
      id_empleado_per: this.empleado.id,
      estado: true
    };

    console.log(consultaNueva);
    this.consultasService.putConsulta(consultaNueva).subscribe(resp => {
      Swal.fire('Consulta guardada correctamente', '', 'success');
    }, error => {
      Swal.fire('Existe un error', '', 'error');
    })
  }

  peticionBorrar(idConsulta: number) {
    Swal.fire({
      title: 'La solicitud de borrar debe ser aprobada por un administrador.',
      text: '¿Esta seguro de enviar la solicitud?',
      showDenyButton: true,
      confirmButtonText: 'Enviar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      // Read more about isConfirmed, isDenied below 
      if (result.isConfirmed) {
        Swal.fire({
          text: 'La solicitud fue enviada, si es aprobada la consulta dejará de aparecer en el historial.',
          icon: 'success'
        })
      } else if (result.isDenied) {
        this.cargarHistoria(this.ciuCliente, this.cliente);
        Swal.fire({
          text: 'La solicitud no fue enviada',
          icon: 'info'
        })
      }
    })
  }

  clickMotivoConsulta() {
    //Mover entre pantallas
    this.motivoConsulta.classList.remove('hidden');
    this.antecedentes.classList.add('hidden');
    this.signosVitales.classList.add('hidden');
    this.examenFisico.classList.add('hidden');
    this.diagnostico.classList.add('hidden');
    this.tratamiento.classList.add('hidden');
    //Cambiar de color el boton
    this.btnMontivoConsulta.classList.add('bg-slate-200')
    this.btnAntecedentes.classList.remove('bg-slate-200')
    this.btnSignosVitales.classList.remove('bg-slate-200')
    this.btnExamenFisico.classList.remove('bg-slate-200')
    this.btnDiagnostico.classList.remove('bg-slate-200')
    this.btnTratamiento.classList.remove('bg-slate-200')
    this.btnAntecedentes.classList.add('bg-white')
    this.btnSignosVitales.classList.add('bg-white')
    this.btnExamenFisico.classList.add('bg-white')
    this.btnDiagnostico.classList.add('bg-white')
    this.btnTratamiento.classList.add('bg-white')
  }

  clickAntecedentes() {
    //Mover entre pantallas
    this.motivoConsulta.classList.add('hidden');
    this.antecedentes.classList.remove('hidden');
    this.signosVitales.classList.add('hidden');
    this.examenFisico.classList.add('hidden');
    this.diagnostico.classList.add('hidden');
    this.tratamiento.classList.add('hidden');
    //Cambiar de color el boton
    this.btnMontivoConsulta.classList.remove('bg-slate-200')
    this.btnAntecedentes.classList.add('bg-slate-200')
    this.btnSignosVitales.classList.remove('bg-slate-200')
    this.btnExamenFisico.classList.remove('bg-slate-200')
    this.btnDiagnostico.classList.remove('bg-slate-200')
    this.btnTratamiento.classList.remove('bg-slate-200')
    this.btnMontivoConsulta.classList.add('bg-white')
    this.btnSignosVitales.classList.add('bg-white')
    this.btnExamenFisico.classList.add('bg-white')
    this.btnDiagnostico.classList.add('bg-white')
    this.btnTratamiento.classList.add('bg-white')
  };
  clickSignosVitales() {
    //Mover entre pantallas
    this.motivoConsulta.classList.add('hidden');
    this.antecedentes.classList.add('hidden');
    this.signosVitales.classList.remove('hidden');
    this.examenFisico.classList.add('hidden');
    this.diagnostico.classList.add('hidden');
    this.tratamiento.classList.add('hidden');
    //Cambiar de color el boton
    this.btnMontivoConsulta.classList.remove('bg-slate-200')
    this.btnAntecedentes.classList.remove('bg-slate-200')
    this.btnSignosVitales.classList.add('bg-slate-200')
    this.btnExamenFisico.classList.remove('bg-slate-200')
    this.btnDiagnostico.classList.remove('bg-slate-200')
    this.btnTratamiento.classList.remove('bg-slate-200')
    this.btnMontivoConsulta.classList.add('bg-white')
    this.btnAntecedentes.classList.add('bg-white')
    this.btnExamenFisico.classList.add('bg-white')
    this.btnDiagnostico.classList.add('bg-white')
    this.btnTratamiento.classList.add('bg-white')
  };

  clickSignosVitalesEnfermero() {
    this.signosVitales.classList.remove('hidden');
  };

  abrirTablaHistorial() {
    this.encerarTextos();
    this.tablaHistorialMedico.classList.remove('hidden');
    this.tablaNuevaConsulta.classList.add('hidden');
    this.btnAgregarConsulta.classList.remove('hidden');
    this.btnHistorialClinico.classList.add('hidden');
  }

  abrirTablaHistorialDentroTabla() {
    this.encerarTextos();
    this.cargarHistoria(this.ciuCliente, this.clienteSeleccionado);
    this.tablaHistorialMedico.classList.remove('hidden');
    this.tablaNuevaConsulta.classList.add('hidden');
    this.btnAgregarConsulta.classList.remove('hidden');
    this.btnHistorialClinico.classList.add('hidden');
  }

  calcularIMC() {
    this.inputPeso = document.querySelector('#peso');
    this.inputTalla = document.querySelector('#talla');
    this.inputImc = document.querySelector('#imc');
    if (this.inputPeso.value != '' && this.inputTalla.value != '') {
      this.inputImc.value = (this.inputPeso.value / this.inputTalla.value).toFixed(2);
    } else {
      this.inputImc.value = '';
    }
  }

  GuardarConsultaEnfermero(formularioEnfermero: NgForm) {
    this.inputImc = document.querySelector('#imc');
    formularioEnfermero.value.imc = this.inputImc.value;
    let formConsulta = {
      ...formularioEnfermero.value,
      idHistoria: this.historiaBasePropia.id,
      idEmpleado: this.empleado.id
    }
    if (formularioEnfermero.valid == true && this.inputImc.value != '') {
      console.log(formConsulta);
      this.consultasService.postConsulta(formConsulta).subscribe(resp => {
        Swal.fire('Consulta médica ingresada correctamente.', '', 'success');
        this.encerarInputs();
      });
    } else {
      Swal.fire('La información esta incompleta, por favor ingrese toda la información.', '', 'error')
    }
  }

  encerarInputs() {
    this.inputPeso = document.querySelector('#peso');
    this.inputTalla = document.querySelector('#talla');
    this.inputImc = document.querySelector('#imc');
    this.inputPrsist = document.querySelector('#prsist');
    this.inputPrdist = document.querySelector('#prdist');
    this.inputtemp = document.querySelector('#temp');
    this.inputFr = document.querySelector('#fr');
    this.inputSat = document.querySelector('#sat');
    this.inputFc = document.querySelector('#fc');

    this.inputPeso.value = '';
    this.inputTalla.value = '';
    this.inputImc.value = '';
    this.inputPrsist.value = '';
    this.inputPrdist.value = '';
    this.inputtemp.value = '';
    this.inputFr.value = '';
    this.inputSat.value = '';
    this.inputFc.value = '';
  }

  clickExamenFisico() {
    //Mover entre pantallas
    this.motivoConsulta.classList.add('hidden');
    this.antecedentes.classList.add('hidden');
    this.signosVitales.classList.add('hidden');
    this.examenFisico.classList.remove('hidden');
    this.diagnostico.classList.add('hidden');
    this.tratamiento.classList.add('hidden');
    //Cambiar de color el boton
    this.btnMontivoConsulta.classList.remove('bg-slate-200')
    this.btnAntecedentes.classList.remove('bg-slate-200')
    this.btnSignosVitales.classList.remove('bg-slate-200')
    this.btnExamenFisico.classList.add('bg-slate-200')
    this.btnDiagnostico.classList.remove('bg-slate-200')
    this.btnTratamiento.classList.remove('bg-slate-200')
    this.btnMontivoConsulta.classList.add('bg-white')
    this.btnAntecedentes.classList.add('bg-white')
    this.btnSignosVitales.classList.add('bg-white')
    this.btnDiagnostico.classList.add('bg-white')
    this.btnTratamiento.classList.add('bg-white')
  };
  clickDiagnostico() {
    //Mover entre pantallas
    this.motivoConsulta.classList.add('hidden');
    this.antecedentes.classList.add('hidden');
    this.signosVitales.classList.add('hidden');
    this.examenFisico.classList.add('hidden');
    this.diagnostico.classList.remove('hidden');
    this.tratamiento.classList.add('hidden');
    //Cambiar de color el boton
    this.btnMontivoConsulta.classList.remove('bg-slate-200')
    this.btnAntecedentes.classList.remove('bg-slate-200')
    this.btnSignosVitales.classList.remove('bg-slate-200')
    this.btnExamenFisico.classList.remove('bg-slate-200')
    this.btnDiagnostico.classList.add('bg-slate-200')
    this.btnTratamiento.classList.remove('bg-slate-200')
    this.btnMontivoConsulta.classList.add('bg-white')
    this.btnAntecedentes.classList.add('bg-white')
    this.btnSignosVitales.classList.add('bg-white')
    this.btnExamenFisico.classList.add('bg-white')
    this.btnTratamiento.classList.add('bg-white')
  };
  clickTratamiento() {
    //Mover entre pantallas
    this.motivoConsulta.classList.add('hidden');
    this.antecedentes.classList.add('hidden');
    this.signosVitales.classList.add('hidden');
    this.examenFisico.classList.add('hidden');
    this.diagnostico.classList.add('hidden');
    this.tratamiento.classList.remove('hidden');
    //Cambiar de color el boton
    this.btnMontivoConsulta.classList.remove('bg-slate-200');
    this.btnAntecedentes.classList.remove('bg-slate-200');
    this.btnSignosVitales.classList.remove('bg-slate-200');
    this.btnExamenFisico.classList.remove('bg-slate-200');
    this.btnDiagnostico.classList.remove('bg-slate-200');
    this.btnTratamiento.classList.add('bg-slate-200');
    this.btnMontivoConsulta.classList.add('bg-white');
    this.btnAntecedentes.classList.add('bg-white');
    this.btnSignosVitales.classList.add('bg-white');
    this.btnExamenFisico.classList.add('bg-white');
    this.btnDiagnostico.classList.add('bg-white');
  };

  cargarConsultas() {
    this.fechaConsulta = '';
    console.log('Aqui se da');
    this.consultasService.getConsultas(this.historiaBasePropia.id).subscribe(resp => {
      this.consultas = resp;
      console.log(resp);
    });
  }

  cargarConsulta(fechaConsulta: Date, idConsulta: number, consulta: Consulta) {
    this.enfermedadesCie = [];
    this.selectCronologia = document.querySelector('#selectCronologia');
    this.selectCondicion = document.querySelector('#selectCondicion');
    this.selectTipo = document.querySelector('#selectTipo');
    /* Motivo de consulta */
    this.inputMotivoConsulta = document.querySelector('#inputMotivoConsulta');
    this.textEnfermedadActual = document.querySelector('#textEnfermedadActual');

    /* Antecedentes */
    this.textAntecedentes = document.querySelector('#textAntecedentes');

    /* Examen Fisico */
    this.textExamenFisico = document.querySelector('#textExamenFisico');
    this.textResultadosExamenes = document.querySelector('#textResultadosExamenes');

    /* Tratamiento */
    this.textTratamiento = document.querySelector('#textTratamiento');

    /* Asignando valores a los inputs o text */
    this.inputMotivoConsulta.value = consulta.motivo_atencion;
    this.textEnfermedadActual.value = consulta.enfermedad_actual;
    this.textAntecedentes.value = consulta.antecedentes;
    this.textExamenFisico.value = consulta.examen_fisico;
    this.textResultadosExamenes.value = consulta.resultados_examenes;
    this.textTratamiento.value = consulta.tratamiento;

    console.log(consulta.tratamiento);

    /* Diagnostico */
    this.selectCronologia = document.querySelector('#selectCronologia');
    this.selectCondicion = document.querySelector('#selectCondicion');
    this.selectTipo = document.querySelector('#selectTipo');
    this.textObservacionDiagnostico = document.querySelector('#textObservacionDiagnostico');
    this.textEnfermedadActualDiagnostico = document.querySelector('#textEnfermedadActualDiagnostico');
    this.textEnfermedadActualDiagnosticoDescripcion = document.querySelector('#textEnfermedadActualDiagnosticoDescripcion');

    this.textObservacionDiagnostico.value = consulta.observacion_signos;

    this.diagnosticosService.getDescripcion(consulta.codigo_cie10_per).subscribe(resp => {
      this.enfermedadesCie.push(resp);
      this.textEnfermedadActualDiagnostico.value = resp.descripcion;
      this.textEnfermedadActualDiagnosticoDescripcion.value = resp.descripcion;
      this.cambiarLabel(resp.codigo_cie10);
    });

    /* Signos vitales */
    this.inputTalla.value = consulta.talla;
    this.inputFc.value = consulta.fc;
    this.inputFr.value = consulta.fr;
    this.inputImc.value = consulta.imc;
    this.inputPeso.value = consulta.peso;
    this.inputPrdist.value = consulta.prdist;
    this.inputPrsist.value = consulta.prsist;
    this.inputSat.value = consulta.sat;
    this.inputtemp.value = consulta.temp;
    this.idConsultaActual = idConsulta;

    this.cronologiasService.getCronologiaPorId(idConsulta).subscribe(resp => {
      if (resp.length != 0) {
        for (let index = 0; index < this.selectCronologia.options.length; index++) {
          if (this.selectCronologia.options[index].text == resp[0].nombre) {
            console.log(this.selectCronologia.options[index].selected = true);
          }
        }
      }
    });
    this.condicionesService.getCondicionPorId(idConsulta).subscribe(resp => {
      if (resp.length != 0) {
        for (let index = 0; index < this.selectCondicion.options.length; index++) {
          if (this.selectCondicion.options[index].text == resp[0].nombre) {
            console.log(this.selectCondicion.options[index].selected = true);
          }
        }
      }
    });
    this.tipoService.getTipoPorId(idConsulta).subscribe(resp => {
      if (resp.length != 0) {
        for (let index = 0; index < this.selectTipo.options.length; index++) {
          if (this.selectTipo.options[index].text == resp[0].nombre) {
            console.log(this.selectTipo.options[index].selected = true);
          }
        }
      }
    });
    this.fechaConsulta = '';
    for (let i = 0; i < 10; i++) {
      const element = fechaConsulta.toString()[i];
      this.fechaConsulta = this.fechaConsulta + element;
    }
    this.abrirTablaUpdateConsulta();
  }

}
