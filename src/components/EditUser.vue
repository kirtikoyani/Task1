<template>
<CreateUser :isEdit="true" :newdata="Newdata" />
</template>

<script>
import CreateUser from './createUser.vue';

export default {
    name: 'HelloWorld',
    components: {
        CreateUser
    },
    props: ['id'],

    data() {
        return {
            datas: [],
            title: 'My Journey with Vue',
            Newdata: {
            },
            showform: false,
            showbtn: true,
            updatebtn: false,
            savebtn: true,
            input: '',
            isEdit:true
        }
    },
    created() {
        this.getdatasFromStorage();
        console.warn(this.id);
        this.loadEditedUser(this.id);
    },

    watch: {
        id(newId) {
      this.loadEditedUser(newId);
    },
  },
    methods: {
        // getting data from localstorage
        loadEditedUser(id) {
            for (let i = 0; i < this.datas.length; i++) {
            if (this.datas[i].id == id) {
                console.log(this.datas[i])
                this.Newdata = this.datas[i];
                return true;
            }
        }
        return false;
        },
        getdatasFromStorage() {
            const datas = JSON.parse(localStorage.getItem('datas') || '[]');
            this.datas = datas;
        },
        // check email is same as existing email
        checkEmailExists(email) {
            for (let i = 0; i < this.datas.length; i++) {
                if (this.datas[i].email.toLowerCase() === email.toLowerCase()) {
                    return true;
                }
            }
            return false;
        },
        // add form data in localstorage
        adddata() {
            if (this.is_edit == false) {
                // check if email already exists
                if (this.checkEmailExists(this.Newdata.email)) {
                    alert('Email address already taken');
                    return;
                }
                if (this.Newdata.number.toString().length < 10) {
                    alert("Enter valid number");
                    return;
                }

                // add new data to array
                const Newdata = {
                    id: Date.now(),
                    ...this.Newdata
                };
                if (this.is_edit) {
                    // if editing an existing user
                    console.log("editing")
                    const index = this.datas.findIndex(i => i.id === this.Newdata.id);
                    this.datas.splice(index, 1, Newdata); // replace user at index
                    localStorage.setItem('datas', JSON.stringify(this.datas));
                } else {
                    // else adding a new user
                    this.datas.unshift(Newdata);
                    localStorage.setItem('datas', JSON.stringify(this.datas));
                    this.clearform();
                    this.showform = false;
                    this.showbtn = true;
                    this.is_edit = false;
                }
            }
        },
    }
}
</script>
