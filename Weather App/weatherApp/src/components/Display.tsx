
type DisplayProps={
    data:{
          city:string,
         latitude:number,
         longitude:number,
         elevation:number,
         timezone:string,
         country:string
    }
}

function Display({ data }: DisplayProps) {


    return (
        <div>
            <h2>Data retrieve</h2>
        </div>
    )
}

export default Display;