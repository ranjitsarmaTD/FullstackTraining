import { EntitySchema } from "typeorm";


const Dept = new EntitySchema({
    name: "Dept",
    tableName: "dept",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        description: {
            type: "varchar"
        }
    }

});

export default Dept;