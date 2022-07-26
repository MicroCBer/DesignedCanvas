class Utils {
    static makeFunctional(obj: any) {
        const r = /gen_functional\((.*?)\)/;
        let result = obj.toString().replace(/\n/g, "\\n").match(r);

        let generated = "// Generated by Utils.ts\n\n"
        if (result) {
            let keys = result[1].split("\\n");
            for (let key of keys) {
                key=key.trim()
                try {
                    let name = key.split(":")[0], type = key.split(":")[1];

                    let upperName = name[0].toUpperCase()
                        + name.split('').slice(1).join('');

                    generated += `with${upperName}(${name}:${type}){this.${name}=${name};return this}\n`
                } catch (e) { }
            }

        }

        return generated
    }
    static makeGetSet(name:string,...args:string[]){
        let generated="// Generated by Utils.ts\n\n";
        for(let arg of args){
            generated+=`    get ${arg}() {return this.${name}.${arg}}
    set ${arg}(v) {this.${name}.${arg} = v}\n`
        }
        return generated
    }
}

export { Utils };