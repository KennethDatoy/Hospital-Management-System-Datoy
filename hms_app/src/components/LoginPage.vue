<template>
  <div class="background-container">
    <div class="container mt-5 p-4 col-10 col-md-6 col-lg-4">
      <div class="row">
        <div class="col-12">
          <h1 class="mb-4" style="text-align: center; font-weight: bold;" >Hospital Management System</h1>
          <form @submit.prevent="LogInUser">
            <div class="form-group mb-3">
              <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" required @input="clearErrors">
              <small class="text-danger" v-if="errors">{{ errors }}</small>
            </div>
            <div class="form-group mb-3">
              <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required @input="clearErrors">
            </div>
            <button type="submit" class="btn btn-success mt-3 w-100">LogIn</button>
          </form>
          <p class="mt-3 text-left">Don't have an account? <router-link to="/register">Register here!</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: null
    };
  },
  methods: {
    async LogInUser() {
      try {
        const response = await axios.post(this.$store.state.apiUrl + '/LogIn', {
          email: this.email,
          password: this.password
        });

        // Check if the response status is 200 (OK) instead of 201 (Created)
        if (response.status === 200) {
          const { user_id, token, redirect } = response.data;

          localStorage.setItem('user_id', user_id);
          localStorage.setItem('token', token);

          // Redirect based on user role
          this.$router.push(redirect);
        } else {
          this.errors = 'LogIn failed. Please check your credentials.';
        }
      } catch (error) {
        this.errors = error.response.data.message;
      }
    },


    clearErrors() {
      this.errors = null;
    }
  }
};
</script>

<style scoped>
.background-container {
  background-image: url('@/assets/background.jpg'); /* Path to your background image */
  background-size: cover;
  background-position: right;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: rgba(248, 249, 250, 0.9); /* Adjusted for a semi-transparent white background */
  padding: 20px;
  border-radius: 8px;
  background-position: right;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 450px; /* Increased container height */
}

.LogIn-card {
  background-color: rgb(235, 4, 4);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h5 {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.form-control {
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-success {
  background-color: #28a745; /* Green success button */
  border-color: #28a745;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.btn-success:hover {
  background-color: #218838; /* Darker green on hover */
  border-color: #1e7e34;
}

.text-center {
  text-align: right;
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.w-100 {
  width: 100% !important;
}

.text-danger {
  color: #dc3545 !important;
}
</style>
