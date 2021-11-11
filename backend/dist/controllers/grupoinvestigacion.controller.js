"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import grupoinvestigacion from "../models/grupoinvestigacion";
const grupoinvestigacion_1 = __importDefault(require("../models/grupoinvestigacion"));
const user_1 = __importDefault(require("../models/user"));
/*
○ Formulario para añadir un grupo de investigación que ha desarrollado una
vacuna: nombre del grupo, descripción. Url, responsable del grupo

○ Listado de grupos de investigación

○ Edición de un grupo de investigación. (Esta funcionalidad es accesible desde el
listado)
*/
//obtenir tots els equips d'investigació
function getAll(req, res) {
    grupoinvestigacion_1.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
//obtenir grup d'investigació
function getGrupoInvestigacion(req, res) {
    grupoinvestigacion_1.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}

//afegir grup d'investigació
function newGrupoInvestigacion(req, res) {
    const user = new user_1.default({
        "nombre": req.body.nombre,
        "direccion": req.body.direccion,
        "id": req.body.id,
    });
    const grupo = new grupoinvestigacion_1.default({
        "nombregrupo": req.body.nombregrupo,
        "id": req.body.id,
        "descripcion": req.body.descripcion,
        "responsable": req.body.responsable,
        "url": req.body.url,
        "users": user
    });
    console.log(req.body);
    grupo.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
//modificar grup d'investigació
function updateGrupoInvestigacion(req, res) {
    const nombregrupo = req.body.nombregrupo;
    const id = req.params.id;
    const nuevaid = req.body.id;
    const descripcion = req.body.descripcion;
    const responsable = req.body.responsable;
    const url = req.body.url;
    grupoinvestigacion_1.default.update({ "id": id }, { $set: { "nombregrupo": nombregrupo, "id": nuevaid, "descripcion": descripcion, "responsable": responsable, "url": url } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
//Delete grup investigacion
function deleteGrupoinvestigacion(req, res) {
    const { id } = req.params;
    grupoinvestigacion_1.default.findOne({ "id": req.params.id }).remove().exec();
}
exports.default = { getAll, getGrupoInvestigacion, newGrupoInvestigacion, updateGrupoInvestigacion, deleteGrupoinvestigacion };
