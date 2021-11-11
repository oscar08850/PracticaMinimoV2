import {User} from "./user";

export interface GrupoInvestigacion {
    nombregrupo: String;
    id: String;
    descripcion: String;
    responsable: String;
    url: String;
    users: User;
}