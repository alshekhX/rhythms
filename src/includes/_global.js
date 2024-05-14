
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default {

    install(app){
      const baseComp =  import.meta.glob("../components/base/*.vue",{
            eager:true
        });

Object.entries(baseComp).forEach(([path,module])=>{
 

    const componentName= upperFirst(camelCase(path.split("/").pop().replace(/\.\w+$/,"")));
    app.component( `Base${componentName}`, module.default);
})



        
    }
}