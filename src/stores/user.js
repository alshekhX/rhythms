import { defineStore } from "pinia";
import { auth, userCollection } from "@/includes/firebase.js";



export default defineStore('user',{
state:()=>({
userLoggedIn:false,
lang:"en"
}),
actions:{

    async register(values){
const userCred= await auth.createUserWithEmailAndPassword(values.email, values.password)

            await userCollection.doc(userCred.user.uid).set({
            name: values.name,
            email: values.email,
            age: values.age,
  
          })

          await userCred.user.updateProfile({
            displayName:values.name
          })
          console.log(userCred.user.uid)

          this.userLoggedIn=true;
    },
    async authenticate(values){

      await auth.signInWithEmailAndPassword(values.email,values.password);


      this.userLoggedIn=true;
    },
    async signOut(){
await auth.signOut();
this.userLoggedIn=false;

    }
}

})