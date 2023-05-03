<template>
<div class="container" v-if="showform">
    <form class="form">
        <h1>Add and edit</h1>
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
            <input type="number" name="number" id="number" v-model="Newdata.number" required>
            <small></small>
        </div>

        <div class="form-field">
            <label for="date">Date of Birth</label>
            <input type="date" name="date" id="date" v-model="Newdata.date" required>
            <small></small>
        </div>

        <div class="form-field-btn">
            <button class="btn" v-if="savebtn" @click.prevent="adddata">save</button>
            <button class="btn" v-if="updatebtn" @click.prevent="updatedata">Update</button>
        </div>
    </form>
</div>
<div class="search-btn">
    <input type="text" v-if="showbtn" placeholder="search" class="input" v-model="input" aria-label="Search" id="searchtextbox">
    <button class="btn-adduser" v-if="showbtn" @click="showform=!showform,showbtn=!showbtn">Add New User</button>
</div>

<table class="table" v-if="showbtn">
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Number</th>
        <th>Date</th>
        <th>Actions</th>
    </tr>
    <tr v-for="data of searchFun()" :key="data">
        <!-- <td>{{ data.id }}</td> -->
        <td>{{ data.name }}</td>
        <td>{{ data.email }}</td>
        <td>{{ data.number }}</td>
        <td>{{ data.date }}</td>
        <td><button class="btn-edit" @click="editdata(data,index)">Edit</button> <button class="btn-delete" @click="deletedata(data)">Delete</button></td>
    </tr>
</table>

<div class="item error" v-if="input&&!searchFun().length">
    <p>No results found!</p>
</div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            datas: [],
            Newdata: {
                name: '',
                email: '',
                number: '',
                date: ''
            },
            showform: false,
            showbtn: true,
            updatebtn: false,
            savebtn: true,
            input: '',
        }
    },
    mounted() {
        this.getdatasFromStorage();
    },
    methods: {
        // getting data from localstorage
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
            this.datas.unshift(Newdata);
            localStorage.setItem('datas', JSON.stringify(this.datas));
            this.clearform();
            this.showform = false;
            this.showbtn = true;
        },
        // clear form
        clearform() {
            this.Newdata.name = '';
            this.Newdata.email = '';
            this.Newdata.number = '';
            this.Newdata.date = '';
        },
        // search functionality
        searchFun() {
            return this.datas.filter((data) =>
                data.name.toLowerCase().includes(this.input.toLowerCase()) || data.email.toLowerCase().includes(this.input.toLowerCase()) || data.number.toString().trim().includes(this.input?.toLowerCase()?.trim()));
        },
        // delete data from array
        deletedata(data) {
            if (confirm("Are you sure to delete the User") == true) {
                const index = this.datas.findIndex(i => i.id === data.id);
                this.datas.splice(index, 1);
                localStorage.setItem('datas', JSON.stringify(this.datas));
            }
        },
        // edit data
        editdata(data) {

            this.Newdata = { ...data };
            this.showform = true;
            this.updatebtn = true;
            this.savebtn = false;
            this.showbtn = false;
        },
        // update data
        updatedata() {
            const index = this.datas.findIndex(i => i.id === this.Newdata.id);
            this.datas[index]={...this.Newdata}
            localStorage.setItem('datas', JSON.stringify(this.datas));
            this.clearform();
            this.showform = false;
            this.showbtn = true;
        }
    }
}
</script>
