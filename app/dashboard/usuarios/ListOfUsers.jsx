import React, { Suspense } from "react";
import Link from "next/link";
import TablaOFUsers from "./TablaOFUsers";

const ListOfUsers = ({ data }) => {
 

  return (
    
      <div className="flex justify-center items-center w-full relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-sky-100 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Telefono
              </th>
             {/*  <th scope="col" className="px-6 py-3">
                Direccion
              </th> */}
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
             

              <th scope="col" className="px-6 py-3">
                Accion
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-slate-50">
    
           <TablaOFUsers data={data}/>
          
          </tbody>
          
        </table>
      </div>
    
  );
};

export default ListOfUsers;
