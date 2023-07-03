<template>
<div class="container">
    <form class="form" @submit.prevent="adddata">
        <h1>{{ routerName }}</h1>

        <div class="form-field">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" v-model="Newdata.name" required>
            <small></small>
        </div>

        <div class="form-field">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="Newdata.email" required>
            <small></small>
        </div>

        <div class="form-field">
            <label for="number">Mobile</label>
            <input type="text" name="number" id="number" v-model="Newdata.number" required>
            <small></small>
        </div>

        <div class="form-field">
            <label for="date">Date of Birth</label>
            <input type="date" name="date" id="date" v-model="Newdata.date" required>
            <small></small>
        </div>

        <div class="form-field-btn">
            <button class="btn" type="submit" v-if="savebtn">Save</button>
        </div>
    </form>
</div>

<div class="item error" v-if="input&&!searchFun().length">
    <p>No results found!</p>
</div>
</template>

<script>
export default {
    name: 'CreateUser',
    props: {
        newdata: {
            type: Object,
            default: () => ({
                name: '',
                email: '',
                number: '',
                date: ''
            })
        },
        isEdit: Boolean
    },
    data() {
        return {
            datas: [],
            Newdata: {
                ...this.newdata
            },
            showform: false,
            showbtn: true,
            updatebtn: false,
            savebtn: true,
            input: '',
            is_edit: this.isEdit,
            isActive: false,
            routerName: ''
        }
    },
    mounted() {
        this.getdatasFromStorage();
        this.routerName = this.$route.name;
        console.log(this.$route.name);
    },
    methods: {
        // getting data from localstorage

        getdatasFromStorage() {
            const datas = JSON.parse(localStorage.getItem('datas') || '[]');
            this.datas = datas;
        },
        // check email is same as existing email
        checkEmailExists(email) {
            return this.datas.filter(e => !this.isEdit || e.email !== this.newdata.email).some((e) => e.email === email)

        },
        // add form data in localstorage

        adddata() {

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

            // store data in localstorage
            this.clearform();
            this.showform = false;
            this.showbtn = true;

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
            }
        },
        // clear form
        clearform() {
            this.Newdata.name = '';
            this.Newdata.email = '';
            this.Newdata.number = '';
            this.Newdata.date = '';
        },

    }
}
</script>
