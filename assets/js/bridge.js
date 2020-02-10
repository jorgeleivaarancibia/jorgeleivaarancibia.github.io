var ID_AZIMUT = 1;
var ID_COORDENADA = 2;
var ID_RECTA = 3;
var ID_TEMPLADO = 4;
var ID_TUNEL = 5;

$(document).ready(function() {
    obtenerSesion();
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }

var parametrosAzimut = {
    N1: 0,
    E1: 0,
    N2: 0,
    E2: 0,
    azimut: 0,
    distancia: 0
};

var parametrosInterseccionRecta = {
    n1: 0,
    e1: 0,
    az1: 0,
    n2: 0,
    e2: 0,
    az2: 0,
    este: 0,
    norte: 0,
    diferenciaPunto1: 0,
    difirenciaPunto2: 0,
    mensaje: ''
};

var parametrosTunelInterCloto = {
    n1: 0,
    e1: 0,
    z1: 0,
    az1: 0,
    k1: 0,
    n: 0,
    e: 0,
    z: 0, 
    c: 0,
    k: 0,
    d: 0,
    h: 0,
    t: 0,
    r: 0
};

var parametrosCoordenadaPunto = {
    cota: false,
    nn: 0,
    ee: 0,
    cc: 0,
    hi: 0,
    az: 0,
    vz: 0,
    di: 0,
    hj: 0,
    n: 0,
    e: 0,
    c: 0
};

var parametrosTemplado = {
    ce: 0,
    hp1: 0,
    hp2: 0,
    aht1: 0,
    dht1: 0,
    avt1: 0,
    aht2: 0,
    dht2: 0,
    avt2: 0,
    vt: 0,
    gama: 0,
    vano: 0,
    vm: 0,
    ctgf: 0,
    aw: 0,
    ax: 0,
    bc: 0,
    bd: 0,
    ba: 0,
    crp: 0,
    bb: 0,
    azc: 0,
    fcr: 0,
    avcr: 0,
    dh2f: 0,
    corrige: false,
    angr: 0,
    corr: 0,
    tpf: 0

};

function calculo() {
    alert("xd");
    var objeto = '{"valor1": 2, "valor2": 3}';
    var data = Android.calcular(objeto);
    alert(data);
    var json = JSON.parse(data);
    alert(json.resultado);
}

function calculoAzimut() {
    var n1 = $("#n1").val();
    var e1 = $("#e1").val();
    var n2 = $("#n2").val();
    var e2 = $("#e2").val();
    if (n1 != undefined && n1 != '' 
        && e1 != undefined && e1 != '' 
        && n2 != undefined && n2 != ''
        && e2 != undefined && e2 != '') {
        /*var objeto = '{"n1":' + n1 + ', "e1":' + e1 + ', "n2":' + n2 + ', "e2":' + e2 + '}';
        var respuesta = Android.calculoAzimut(objeto);
        var json = JSON.parse(respuesta);
        var resultadoP1 = json.p1;
        var resultadoDistancia = json.distancia;*/
        parametrosAzimut.N1 = n1;
        parametrosAzimut.E1 = e1;
        parametrosAzimut.N2 = n2;
        parametrosAzimut.E2 = e2;
        resultadoAzimut();
        $("#resultadoAzP1P2").text(parametrosAzimut.azimut);
        $("#resultadoDistancia").text(parametrosAzimut.distancia);
        guardarSesion();
        scrollA('resultadoAzimut');
    } else {
        return false;
    }
}

function calculoRecta() {
    var n1 = $("#n1").val();
    var e1 = $("#e1").val();
    var az1 = $("#az1").val();
    var n2 = $("#n2").val();
    var e2 = $("#e2").val();
    var az2 = $("#az2").val();
    if (n1 != undefined && n1 != '' 
        && e1 != undefined && e1 != '' 
        && az1 != undefined && az1 != '' 
        && n2 != undefined && n2 != '' 
        && e2 != undefined && e2 != '' 
        && az2 != undefined && az2 != '') {
        /*var objeto = '{"n1":' + n1 + ', "e1":' + e1 + ', "az1":' + az1 + ', "n2":' + n2 + ', "e2":' + e2 + ', "az2":' + az2 + '}';
        var respuesta = Android.calculoRecta(objeto);
        var json = JSON.parse(respuesta);
        var mensaje = json.mensaje;*/
        parametrosInterseccionRecta.n1 = Number(n1);
        parametrosInterseccionRecta.e1 = Number(e1);
        parametrosInterseccionRecta.az1 = Number(az1);
        parametrosInterseccionRecta.n2 = Number(n2);
        parametrosInterseccionRecta.e2 = Number(e2);
        parametrosInterseccionRecta.az2 = Number(az2);
        parametrosInterseccionRecta.mensaje = '';
        resultadoInterseccionDeRecta();
        if (parametrosInterseccionRecta.mensaje != '') {
            $("#resultadoNo").removeClass("hide");
            $("#resultadoInterseccionRecta").addClass("hide");
            $("#resultadoMensaje").text(parametrosInterseccionRecta.mensaje);
            scrollA('resultadoNo');
        } else {
            $("#resultadoInterseccionRecta").removeClass("hide");
            $("#resultadoNo").addClass("hide");
            var n = parametrosInterseccionRecta.norte;
            var e = parametrosInterseccionRecta.este;
            var dhp1 = parametrosInterseccionRecta.diferenciaPunto1;
            var dhp2 = parametrosInterseccionRecta.difirenciaPunto2;
            $("#resultadoN").text(n);
            $("#resultadoE").text(e);
            $("#resultadoD1").text(dhp1);
            $("#resultadoD2").text(dhp2);
            scrollA('resultadoInterseccionRecta');
        }
        guardarSesion();
    } else {
        return false;
    }
}

function desplegarCalculoCota() {
    if ($("#ccota").is(":checked")) {
        $("#div_cest").removeClass("hide");
        $("#div_hi").removeClass("hide");
        $("#div_hj").removeClass("hide");
    } else {
        $("#div_cest").addClass("hide");
        $("#div_hi").addClass("hide");
        $("#div_hj").addClass("hide");
    }
}

function calculoCoordenada() {
    var nest = $("#nest").val();
    var eest = $("#eest").val();
    var az = $("#az").val();
    var vz = $("#vz").val();
    var di = $("#di").val();
    var cest = 0;
    var hi = 0;
    var hj = 0;
    var objeto;

    if ($("#ccota").is(":checked")) {
        cest = $("#cest").val();
        hi = $("#hi").val();
        hj = $("#hj").val();
        if (nest != undefined && nest != '' 
            && eest != undefined && eest != '' 
            && az != undefined && az != '' 
            && vz != undefined && vz != '' 
            && di != undefined && di != ''
            && cest != undefined && cest != '' 
            && hi != undefined && hi != '' 
            && hj != undefined && hj != '') {
        } else {
            return false;
        }
    } else {
        if (nest != undefined && nest != '' 
            && eest != undefined && eest != '' 
            && az != undefined && az != '' 
            && vz != undefined && vz != '' 
            && di != undefined && di != '') {
        }  else {
            return false;
        }
    }
    /*objeto = '{"nest":' + nest + ', "eest":' + eest + ', "az":' + az + ', "vz":' + vz + ', "di":' + di;
    if ($("#ccota").is(":checked")) {
        objeto += ', "ccota": true, "cest":' + cest + ', "hi":' + hi + ', "hj":' + hj;
    } else {
        objeto += ', "ccota": false';
    }
    objeto += '}';*/
    parametrosCoordenadaPunto.nn = Number(nest);
    parametrosCoordenadaPunto.ee = Number(eest);
    parametrosCoordenadaPunto.az = Number(az);
    parametrosCoordenadaPunto.vz = Number(vz);
    parametrosCoordenadaPunto.di = Number(di);
    parametrosCoordenadaPunto.cc = Number(cest);
    parametrosCoordenadaPunto.hi = Number(hi);
    parametrosCoordenadaPunto.hj = Number(hj);

    resultadoCoordenadaPunto();


    /*var respuesta = Android.calculoCoordenada(objeto);
    var json = JSON.parse(respuesta);*/

    var resultadoN = parametrosCoordenadaPunto.n;
    var resultadoE = parametrosCoordenadaPunto.e;
    $("#resultadoN").text(resultadoN);
    $("#resultadoE").text(resultadoE);
    if ($("#ccota").is(":checked")) {
        var resultadoCota = parametrosCoordenadaPunto.c;
        $("#resultadoCota").text(resultadoCota);
        $("#tr_cota").removeClass("hide");
        parametrosCoordenadaPunto.cota = true;
    } else {
        $("#tr_cota").addClass("hide");
        parametrosCoordenadaPunto.cota = false;
    }
    scrollA('resultadoCoordenada');
    guardarSesion();
}

function calculoTemplado() {
    var cest = $("#cest").val();
    var ap1 = $("#ap1").val();
    var ap2 = $("#ap2").val();
    var act1 = $("#act1").val();
    var dht1 = $("#dht1").val();
    var avt1 = $("#avt1").val();
    var aht2 = $("#aht2").val();
    var dht2 = $("#dht2").val();
    var avt2 = $("#avt2").val();
    var vt = $("#vt").val();

    if (cest != undefined && cest != '' 
        && ap1 != undefined && ap1 != '' 
        && ap2 != undefined && ap2 != '' 
        && act1 != undefined && act1 != '' 
        && dht1 != undefined && dht1 != '' 
        && avt1 != undefined && avt1 != '' 
        && dht2 != undefined && dht2 != '' 
        && avt2 != undefined && avt2 != '' 
        && vt != undefined && vt != '') {

        /*var objeto = '{"cest":' + cest + ', "ap1":' + ap1 + ', "ap2":' + ap2 + ', "act1":' + act1 + ', "dht1":' + dht1 + ', "avt1":' + avt1 
            + ', "aht2":' + aht2 + ', "dht2":' + dht2 + ', "avt2":' + avt2 + ', "vt":' + vt + '}';
        var respuesta = Android.calculoTemplado(objeto);
        var json = JSON.parse(respuesta);*/
        parametrosTemplado.ce = cest;
        parametrosTemplado.hp1 = ap1;
        parametrosTemplado.hp2 = ap2;
        parametrosTemplado.aht1 = act1;
        parametrosTemplado.dht1 = dht1;
        parametrosTemplado.avt1 = avt1;
        parametrosTemplado.aht2 = aht2;
        parametrosTemplado.avt2 = avt2;
        parametrosTemplado.vt = vt;

        resultadoGamaTemplado();

        var gama = parametrosTemplado.gama;
        var vano = parametrosTemplado.vano;
        var vm = parametrosTemplado.vm;
        var ctgf = parametrosTemplado.ctgf;
        $("#gama").text(gama);
        $("#vano").text(vano);
        $("#vm").val(vm);
        $("#ctgf").val(ctgf);

        $("#calculoTemplado").addClass("hide");
        $("#resultadoTemplado").removeClass("hide");
        $("#temperaturaTemplado").removeClass("hide");

        scrollA('resultadoTemplado');
    }
}

function continuarTemplado() {
    var dht1 = $("#dht1").val();
    var dht2 = $("#dht2").val();
    var gama = $("#gama").text();
    var vano = $("#vano").text();
    var vm = $("#vm").val();
    var ctgf = $("#ctgf").val();
    var vt = $("#vt").val();

    var aw = $("#temperaturaInicio").val();
    var ax = $("#temperaturaTermino").val();
    var bc = $("#flechaInicio").val();
    var bd = $("#flechaTermino").val();
    var ba = $("#temperaturaReal").val();
    var crp = $("#creep").val();

    if (aw != undefined && aw != '' 
        && ax != undefined && ax != '' 
        && bc != undefined && bc != '' 
        && bd != undefined && bd != '' 
        && ba != undefined && ba != '' 
        && crp != undefined && crp != '') {

        /*var objeto = '{"aw":' + aw + ', "ax":' + ax + ', "bc": ' + bc + ', "bd":' + bd + ', "ba":' + ba + ', "crp":' + crp
            + ', "dht1":' + dht1 + ', "dht2":' + dht2 + ', "gama":' + gama + ', "vano":' + vano + ', "vm":' + vm 
            + ', "ctgf":' + ctgf + ', "vt":' + vt + '}';

        var respuesta = Android.continuarTemplado(objeto);
        var json = JSON.parse(respuesta);*/

        parametrosTemplado.aw = aw;
        parametrosTemplado.ax = ax;
        parametrosTemplado.bc = bc;
        parametrosTemplado.bd = bd;
        parametrosTemplado.ba = ba;
        parametrosTemplado.crp = crp;

        resultadoTempladoCorregido();


        var bb = parametrosTemplado.bb;
        var azc = parametrosTemplado.azc;
        var fcr = parametrosTemplado.fcr;
        var avcr = parametrosTemplado.avcr;
        var dh2f = parametrosTemplado.dh2f;

        $("#resultadoTemperatura").text(bb);
        $("#resultadoCatenaria").text(azc);
        $("#resultadoFlecha").text(fcr);
        $("#resultadoAngulo").text(avcr);
        $("#dh2f").val(dh2f);

        //RESULTADO CALCULAR TEMPLADO
        $("#resultadoTemplado").addClass("hide");
        $("#temperaturaTemplado").addClass("hide");

        
        $("#corrigeTemplado").removeClass("hide");
        $("#resultadoTemperaturaTrabajo").removeClass("hide");

        scrollA('corrigeTemplado');

    }
}

function siCorrigeTemplado() {
    $("#corrige_titulo").addClass("hide");
    $("#corrige_botones").addClass("hide");
    $("#corrige_angr").removeClass("hide");
    $("#corregir_accion").removeClass("hide");
}

function noCorrige() {
    $("#cambioTemperatura").removeClass("hide");
    $("#resultadoTemperaturaTrabajo").addClass("hide");
    $("#corrigeTemplado").addClass("hide");
}

function siCambioTemperatura() {
    $("#cambioTemperatura").addClass("hide");
    $("#resultadoCorreccionTemplado").addClass("hide");
    $("#calculoTemplado").removeClass("hide");
}

function noCambioTemperatura() {
    $("#cambioTemperatura").addClass("hide");
    $("#resultadoCorreccionTemplado").addClass("hide");
    $("#resultadoTemplado").removeClass("hide");
    $("#temperaturaTemplado").removeClass("hide");
}

function corregirTemplado() {
    var angr = $("#angr").val();
    var avcr = $("#resultadoAngulo").text();
    var fcr = $("#resultadoFlecha").text();
    var dh2f = $("#dh2f").val();

    if (angr != undefined && angr != '' 
        && avcr != undefined && avcr != '' 
        && fcr != undefined && fcr != '' 
        && dh2f != undefined && dh2f != '' ) {

        /*var objeto = '{"angr":' + angr + ', "avcr":' + avcr + ', "fcr":' + fcr + ', "dh2f":' + dh2f + '}';

        var respuesta = Android.corregirTemplado(objeto);
        var json = JSON.parse(respuesta);*/

        parametrosTemplado.angr = angr;
        parametrosTemplado.avcr = avcr;
        parametrosTemplado.fcr = fcr;
        parametrosTemplado.dh2f = dh2f;

        resultadoTempladoCambioTemperatura();

        var corr = parametrosTemplado.corr;
        var tpf = parametrosTemplado.tpf;

        $("#resultadoCorreccion").text(corr);
        $("#resultadoPorcentaje").text(tpf);

        $("#resultadoTemperaturaTrabajo").addClass("hide");
        $("#corrigeTemplado").addClass("hide");

        $("#resultadoCorreccionTemplado").removeClass("hide");
        $("#cambioTemperatura").removeClass("hide");

        $("#corrige_titulo").removeClass("hide");
        $("#corrige_botones").removeClass("hide");
        $("#corrige_angr").addClass("hide");
        $("#corregir_accion").addClass("hide");
    }
}

function calculoTunel() {
    var n1 = $("#n1").val();
    var e1 = $("#e1").val();
    var az1 = $("#az1").val();
    var k1 = $("#k1").val();
    var n = $("#n").val();
    var e = $("#e").val();

    if (n1 != undefined && n1 != '' 
        && e1 != undefined && e1 != '' 
        && az1 != undefined && az1 != '' 
        && k1 != undefined && k1 != '' 
        && n != undefined && n != '' 
        && e != undefined && e != '' ) {

        /*var objeto = '{"n1":' + n1 + ', "e1":' + e1 + ', "az1":' + az1 + ', "k1":' + k1 + ', "n":' + n + ', "e":' + e + '}' ;
        var respuesta = Android.calculoTunel(objeto);
        var json = JSON.parse(respuesta);*/

        parametrosTunelInterCloto.n1 = Number(n1);
        parametrosTunelInterCloto.e1 = Number(e1);
        parametrosTunelInterCloto.az1 = Number(az1);
        parametrosTunelInterCloto.k1 = Number(k1);
        parametrosTunelInterCloto.n = Number(n);
        parametrosTunelInterCloto.e = Number(e);


        resultadoTunelInterCloto();

        var k = parametrosTunelInterCloto.k;
        var d = parametrosTunelInterCloto.d;

        $("#resultadoKM").text(k);
        $("#resultadoDist").text(d);
        guardarSesion();
    }
}


function resultadoAzimut() {
    
     var j = (parametrosAzimut.N2 - parametrosAzimut.N1);
     var k = (parametrosAzimut.E2 - parametrosAzimut.E1);
     var l = Math.sqrt(j*j + k*k);
     var sqnk = 1;

     if (k < 0) {
        sqnk = -1;
     }

     var m = 0;
     if (j === 0) {
        m = 100*sqnk
     }

     if (m < 0) {
        m = m + 400;
     } else {
         m = convertirSexagesimalACentesimal(toDegree(Math.atan(k/j)));
     }

     if (j < 0) {
        m = m + 200;
     }

     if (m < 0) {
        m = m + 400
     }

     var azimut = round(m, 4);
     var distancia = round(l, 3);
     parametrosAzimut.azimut = azimut;
     parametrosAzimut.distancia = distancia;
     $("#pantalla").val("");
     var resultado = "Az.P1-P2: " + azimut + "\n";
     resultado += "Distancia: " + distancia;
     $("#pantalla").val(resultado);
}

function resultadoInterseccionDeRecta() {
    var a1 = 0;
    var a2 = 0;
    var aa = 0;
    var e = 0;
    var n = 0;
    var d1 = 0;
    var d2 = 0;

    var az1 = parametrosInterseccionRecta.az1;
    var n1 = parametrosInterseccionRecta.n1;
    var e1 = parametrosInterseccionRecta.e1;

    var az2 = parametrosInterseccionRecta.az2;
    var n2 = parametrosInterseccionRecta.n2;
    var e2 = parametrosInterseccionRecta.e2;

    if (az1 == 0 || az1 == 200) {
        a1 = 1e+09;
    } else if (az1 == 100 || az1 == 300) {
        a1 = 1e-09;
    } else {
        var az1Radian = convertirCentesimalASexagesimalRadian(az1);
        a1 = 1/Math.tan(az1Radian);
    }

    if (az2 === 0 || az2 === 200) {
        a2 = 1e+09;
    } else if (az2 === 100 || az2 === 300) {
        a2 = 1e-09;
    } else {
        var az2Radian = convertirCentesimalASexagesimalRadian(az2);
        a2 = 1/Math.tan(az2Radian);
    }

    aa = a1 - a2;

    if (aa === 0) {
        parametrosInterseccionRecta.mensaje = "No se intersectan";
    } else {
        e = (n2 - n1 + a1 * e1 - a2 * e2)/aa;
        n = (n1 + (e - e1) * a1);
        d1 = Math.sqrt(Math.pow((n1 - n), 2) + Math.pow((e1 - e), 2));
        d2 = Math.sqrt(Math.pow((n2 - n), 2) + Math.pow((e2 - e), 2));
        parametrosInterseccionRecta.este = (round(e, 4));
        parametrosInterseccionRecta.norte = (round(n, 4));
        parametrosInterseccionRecta.diferenciaPunto1 = (round(d1, 4));
        parametrosInterseccionRecta.difirenciaPunto2 = (round(d2, 4));  
    }

}

function resultadoTunelInterCloto() {
    var e = parametrosTunelInterCloto.e;
    var e1 = parametrosTunelInterCloto.e1;
    var n = parametrosTunelInterCloto.n;
    var n1 = parametrosTunelInterCloto.n1;
    var az1 = parametrosTunelInterCloto.az1;
    var k1 = parametrosTunelInterCloto.k1;

    var x = Math.hypot((e - e1), (n - n1));
    var x2 = x;
    x = round(x, 3);
    var y = ((e - e1) / x2);

    var distanciaY = n - n1;
    var distanciaX = e - e1;

    y = convertirSexagesimalACentesimal(toDegree(Math.atan(distanciaY/distanciaX)));
    y = round(y, 4);

    var a2 = 100 - y - az1;

    if (a2 < 0) {
        a2 = a2 + 400;
    }

    var a2Radian = convertirCentesimalASexagesimalRadian(a2);
    var k = x * Math.cos(a2Radian) + k1;
    var d = x * Math.sin(a2Radian);

    parametrosTunelInterCloto.k = round(k, 3);
    parametrosTunelInterCloto.d = round(d, 3);
    scrollA('resultadoTunel');

}

function resultadoCoordenadaPunto() {

    var vzRadian = convertirCentesimalASexagesimalRadian(parametrosCoordenadaPunto.vz);
    var azRadian = convertirCentesimalASexagesimalRadian(parametrosCoordenadaPunto.az);
    var dh = parametrosCoordenadaPunto.di * Math.sin(vzRadian);
    var n = parametrosCoordenadaPunto.nn + dh * Math.cos(azRadian);
    var e = parametrosCoordenadaPunto.ee + dh * Math.sin(azRadian);
    var c = parametrosCoordenadaPunto.cc + parametrosCoordenadaPunto.hi - parametrosCoordenadaPunto.hj + parametrosCoordenadaPunto.di * Math.cos(vzRadian);

    parametrosCoordenadaPunto.n = round(n, 3);
    parametrosCoordenadaPunto.e = round(e, 3);
    parametrosCoordenadaPunto.c = round(c, 3);

}

function resultadoGamaTemplado() {
    var gama = parametrosTemplado.aht2 - parametrosTemplado.aht1;
    var gamaRadian = convertirCentesimalASexagesimalRadian(gama);
    var grados = Math.cos(gamaRadian);
    var vano = Math.sqrt(Math.pow(parametrosTemplado.dht1, 2) + Math.pow(parametrosTemplado.dht2, 2) - (2*parametrosTemplado.dht2*parametrosTemplado.dht2*grados));
    parametrosTemplado.gama = gama;
    parametrosTemplado.vano = vano;

    var vm = vano * 0.5;
    var avt1Radian = convertirCentesimalASexagesimalRadian(parametrosTemplado.avt1);
    var dpt1 = (1/Math.tan(avt1Radian)) * parametrosTemplado.dht1;

    var avt2Radian = convertirCentesimalASexagesimalRadian(parametrosTemplado.avt2);
    var dpt2 = (1/Math.tan(avt2Radian)) * parametrosTemplado.dht2;

    var cct1 = parametrosTemplado.ce + dpt1;
    var cct2 = parametrosTemplado.ce + dpt2;
    var ctgf = (cct1 + cct2) * 0.5;

    parametrosTemplado.vm = vm;
    parametrosTemplado.ctgf = ctgf;

}

function resultadoTempladoCorregido() {
    var bb = parametrosTemplado.ba + parametrosTemplado.crp;
    var ftc = (parametrosTemplado.bd - parametrosTemplado.bc)/20;
    var dflt = bb - parametrosTemplado.aw;
    var ftr = parametrosTemplado.bc + (ftc*dflt);

    var beta = Math.acos((Math.pow(parametrosTemplado.dht2, 2) + Math.pow(parametrosTemplado.vano, 2) - Math.pow(parametrosTemplado.dht1,2))/(2 * parametrosTemplado.dht2 * parametrosTemplado.vano));
    var alfa = Math.acos((Math.pow(parametrosTemplado.dht1, 2) + Math.pow(parametrosTemplado.vano, 2) - Math.pow(parametrosTemplado.dht2,2))/(2 * parametrosTemplado.dht1 * parametrosTemplado.vano));
    var check = alfa + beta + parametrosTemplado.gama;

    var dh2f = Math.sqrt(Math.pow(parametrosTemplado.vm, 2) + Math.pow(parametrosTemplado.dht1, 2) - 2 * parametrosTemplado.vm * parametrosTemplado.dht1 * Math.cos(alfa));
    var delta = convertirSexagesimalACentesimal(toDegree(Math.acos((Math.pow(parametrosTemplado.dht1, 2) + Math.pow(dh2f, 2) - Math.pow(parametrosTemplado.vm, 2))/(2* parametrosTemplado.dht1 * dh2f))));

    var azc = parametrosTemplado.aht1 + delta;
    var fcr = Math.pow(parametrosTemplado.vano, 2) * ftr/Math.pow(parametrosTemplado.vt, 2);
    var ctfcr = parametrosTemplado.ctgf - fcr;
    var dnfcr = ctfcr - parametrosTemplado.ce;
    var dfv = parametrosTemplado.vt - parametrosTemplado.vano;

    var avcr = 100 - convertirSexagesimalACentesimal(toDegree(Math.atan(dnfcr/dh2f)));

    parametrosTemplado.bb = bb;
    parametrosTemplado.azc = azc;
    parametrosTemplado.fcr = fcr;
    parametrosTemplado.avcr = avcr;
    parametrosTemplado.dh2f = dh2f;
}

function resultadoTempladoCambioTemperatura() {
    var dang = parametrosTemplado.angr - parametrosTemplado.avcr;
    var dangRadian = convertirCentesimalASexagesimalRadian(dang);

    var corr = Math.tan(dangRadian) * parametrosTemplado.dh2f;
    var tpf = (corr/parametrosTemplado.fcr) * 100;
    parametrosTemplado.corr = corr;
    parametrosTemplado.tpf = tpf;
}

function convertirCentesimalASexagesimalRadian(angulo) {
    var anguloSexagesimalRadian = toRadians(360 * angulo/400);
    return anguloSexagesimalRadian;
}

function toRadians(degrees) {
  var pi = Math.PI;
  return degrees *pi/180;
}

function toDegree(radian) {
    return radian*180/Math.PI;
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function convertirSexagesimalACentesimal(angulo) {
    return (400*angulo)/360;
}

function scrollA(idElemento) {
    $('html, body').animate({
        scrollTop: ($('#' + idElemento).offset().top)
    },500);
}

function guardarSesion() {

    var idFuncion = Number($("#idFuncion").val());
    switch (idFuncion) {
        case ID_AZIMUT:
            localStorage.setItem('p7.azimut', JSON.stringify(parametrosAzimut));
            break;
        case ID_COORDENADA:
            localStorage.setItem('p7.coordenada', JSON.stringify(parametrosCoordenadaPunto));
            break;
        case ID_RECTA:
            localStorage.setItem('p7.recta', JSON.stringify(parametrosInterseccionRecta));
            break;
        case ID_TEMPLADO:
            localStorage.setItem('p7.templado', JSON.stringify(parametrosTemplado));
            break;
        case ID_TUNEL:
            localStorage.setItem('p7.tunel', JSON.stringify(parametrosTunelInterCloto));
            break;
    }

}

function obtenerSesion() {
    var idFuncion = Number($("#idFuncion").val());
    var objetoSesion;
    switch (idFuncion) {
        case ID_AZIMUT:
                objetoSesion = localStorage.getItem('p7.azimut');
            if (objetoSesion != undefined && objetoSesion !== '') {
                parametrosAzimut = JSON.parse(objetoSesion);
                setFormularioAzimut();
            }
            break;
        case ID_COORDENADA:
            objetoSesion = localStorage.getItem('p7.coordenada');
            if (objetoSesion != undefined && objetoSesion !== '') {
                parametrosCoordenadaPunto = JSON.parse(objetoSesion);
                setFormularioCoordenadaPunto();
            }
            break;
        case ID_RECTA:
            objetoSesion = localStorage.getItem('p7.recta');
            if (objetoSesion != undefined && objetoSesion !== '') {
                parametrosInterseccionRecta = JSON.parse(objetoSesion);
                setFormularioRecta();
            }
            break;
        case ID_TEMPLADO:
            objetoSesion = localStorage.getItem('p7.templado');
            if (objetoSesion != undefined && objetoSesion !== '') {
                parametrosTemplado = JSON.parse(objetoSesion);
                setFormularioTemplado();
            }
            break;
        case ID_TUNEL:
            objetoSesion = localStorage.getItem('p7.tunel');
            if (objetoSesion != undefined && objetoSesion !== '') {
                parametrosTunelInterCloto = JSON.parse(objetoSesion);
                setFormularioTunel();
            }
            break;
    }
}

function setFormularioAzimut() {
    $("#n1").val(parametrosAzimut.N1);
    $("#e1").val(parametrosAzimut.E1);
    $("#n2").val(parametrosAzimut.N2);
    $("#e2").val(parametrosAzimut.E2);
    $("#resultadoAzP1P2").text(parametrosAzimut.azimut);
    $("#resultadoDistancia").text(parametrosAzimut.distancia);
}

function setFormularioCoordenadaPunto() {
    $("#nest").val(parametrosCoordenadaPunto.nn);
    $("#eest").val(parametrosCoordenadaPunto.ee);
    $("#az").val(parametrosCoordenadaPunto.az);
    $("#vz").val(parametrosCoordenadaPunto.vz);
    $("#di").val(parametrosCoordenadaPunto.di);
    $("#resultadoN").text(parametrosCoordenadaPunto.n);
    $("#resultadoE").text(parametrosCoordenadaPunto.e);
    if (parametrosCoordenadaPunto.cota != undefined && parametrosCoordenadaPunto.cota) {
        $("#ccota").prop("checked", true);
        desplegarCalculoCota();
        $("#cest").val(parametrosCoordenadaPunto.cc);
        $("#hi").val(parametrosCoordenadaPunto.hi);
        $("#hj").val(parametrosCoordenadaPunto.hj);
        $("#resultadoCota").text(parametrosCoordenadaPunto.c);
        $("#tr_cota").removeClass("hide");
    } else {
        $("#tr_cota").addClass("hide");
    }

}

function setFormularioRecta() {
    $("#n1").val(parametrosInterseccionRecta.n1);
    $("#e1").val(parametrosInterseccionRecta.e1);
    $("#az1").val(parametrosInterseccionRecta.az1);
    $("#n2").val(parametrosInterseccionRecta.n2);
    $("#e2").val(parametrosInterseccionRecta.e2);
    $("#az2").val(parametrosInterseccionRecta.az2);
    $("#resultadoN").text(parametrosInterseccionRecta.norte);
    $("#resultadoE").text(parametrosInterseccionRecta.este);
    $("#resultadoD1").text(parametrosInterseccionRecta.diferenciaPunto1);
    $("#resultadoD2").text(parametrosInterseccionRecta.difirenciaPunto2);
    $("#resultadoMensaje").text(parametrosInterseccionRecta.mensaje);
}

function setFormularioTunel() {
    $("#n1").val(parametrosTunelInterCloto.n1);
    $("#e1").val(parametrosTunelInterCloto.e1);
    $("#az1").val(parametrosTunelInterCloto.az1);
    $("#k1").val(parametrosTunelInterCloto.k1);
    $("#n").val(parametrosTunelInterCloto.n);
    $("#e").val(parametrosTunelInterCloto.e);
    $("#resultadoKM").text(parametrosTunelInterCloto.k);
    $("#resultadoDist").text(parametrosTunelInterCloto.d);

}

function setFormularioTemplado() {

}