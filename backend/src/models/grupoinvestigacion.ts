import mongoose, { Schema, Document} from 'mongoose';

//model grupoinvestigación


const grupoinvestigacionSchema = new Schema({
    nombregrupo: {
        type: String
    },
    id: {
        type: String
    },
    descripcion: {
        type: String
    },
    responsable: {
        type: String
    },
    url: {
        type: String
    },

    users: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    });

export interface IGrupoInvestigacion extends Document {
    nombregrupo: String;
    id: String;
    descripcion: String;
    responsable: String;
    url: String;
    users: "User";

}


export default mongoose.model<IGrupoInvestigacion>('GrupoInvestigacion', grupoinvestigacionSchema);