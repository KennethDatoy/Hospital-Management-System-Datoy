<template>
  <div class="background-container">
    <div class="container mt-100">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-4">
          <div class="registration-card p-4">
            <h3 class="text-center mb-4" style="text-align: center; font-weight: bold;">Registration Form</h3>
            <form @submit.prevent="registerUser">
              <div class="form-group mb-3">
                <input type="text" class="form-control" id="firstname" v-model="firstname" @input="clearErrors('firstname')" placeholder="Enter first name" required>
              </div>
              <div class="form-group mb-3">
                <input type="text" class="form-control" id="lastname" v-model="lastname" @input="clearErrors('lastname')" placeholder="Enter last name" required>
              </div>
              <div class="form-group mb-3">
                <input type="email" class="form-control" id="email" v-model="email" @input="clearErrors('email')" placeholder="Enter email" required>
                <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
              </div>
              <div class="form-group mb-3">
                <input type="password" class="form-control" id="password" v-model="password" @input="clearErrors('password')" placeholder="Password" required>
                <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
              </div>
              <div class="form-group mb-3">
                <input type="password" class="form-control" id="confirm" v-model="confirm" placeholder="Confirm Password" required>
              </div>
              <div class="form-group mb-3">
                <select class="form-control" id="role" v-model="role" @change="clearErrors('role')" required>
                  <option value="" disabled>Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                </select>
                <small class="text-danger" v-if="errors.role">{{ errors.role[0] }}</small>
              </div>

              <!-- Conditional fields for Doctor -->
              <div v-if="role === 'Doctor'">
                <div class="form-group mb-3">
                  <input type="text" class="form-control" v-model="specialization" placeholder="Enter specialization" required>
                </div>
                <div class="form-group mb-3">
                  <input type="text" class="form-control" v-model="license_number" placeholder="Enter license number" required>
                </div>
                <div class="form-group mb-3">
                  <input type="number" class="form-control" v-model="years_of_experience" placeholder="Enter years of experience" required>
                </div>
              </div>

              <!-- Conditional fields for Patient -->
              <div v-if="role === 'Patient'">
                <div class="form-group mb-3">
                  <input type="date" class="form-control" v-model="date_of_birth" placeholder="Enter date of birth" required>
                </div>
                <div class="form-group mb-3">
                  <select class="form-control" v-model="gender" required>
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div class="form-group mb-3">
                  <input type="text" class="form-control" v-model="address" placeholder="Enter address" required>
                </div>
                <div class="form-group mb-3">
                  <input type="text" class="form-control" v-model="phone" placeholder="Enter phone number" required>
                </div>
                <div class="form-group mb-3">
                  <input type="text" class="form-control" v-model="medical_history" placeholder="Enter medical history" required>
                </div>
              </div>

              <div class="button-container mt-4">
                <button type="submit" class="btn btn-primary">Register</button>
                <router-link to="/" class="btn btn-secondary ml-2">Log In</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Popover element -->
  <div id="registrationPopover" class="popover fade" role="tooltip">
    <div class="popover-body text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="100" height="100" viewBox="0 0 24 24" stroke-width="2" stroke="green" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 12l2 2 4-4"></path>
      </svg>
      <p class="mt-2 mb-0">Registration successful!</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Popover } from 'bootstrap';

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm: '',
      role: '', // Add role to data properties
      errors: {},
      // Additional fields for Doctor
      specialization: '',
      license_number: '',
      years_of_experience: '',
      // Additional fields for Patient
      date_of_birth: '',
      gender: '',
      address: '',
      phone: '',
      medical_history: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post(this.$store.state.apiUrl + '/register', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm,
          role: this.role,
          ...(this.role === 'Doctor' && {
            specialization: this.specialization,
            license_number: this.license_number,
            years_of_experience: this.years_of_experience,
          }),
          ...(this.role === 'Patient' && {
            date_of_birth: this.date_of_birth,
            gender: this.gender,
            address: this.address,
            phone: this.phone,
            medical_history: this.medical_history
          })
        });
        if (response.status === 201) {
          const popover = new Popover(document.getElementById('registrationPopover'), {
            content: 'Registration successful!',
            trigger: 'manual', // Show popover manually
            placement: 'top', // Show at the top of the button
            container: 'body', // Ensure it's appended to body
            html: true, // Allow HTML content
          });
          popover.show(); // Show the popover
          this.resetForm();
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error response:', error.response); // Debugging log
        if (error.response && error.response.data) {
          this.errors = error.response.data;
        } else {
          console.error('Unknown error:', error);
        }
      }
    },

    resetForm() {
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.password = '';
      this.confirm = '';
      this.role = '';
      this.specialization = '';
      this.license_number = '';
      this.years_of_experience = '';
      this.date_of_birth = '';
      this.gender = '';
      this.address = '';
      this.phone = '';
      this.medical_history = '';
    },
    clearErrors(field) {
      this.errors[field] = null;
    }
  }
};
</script>

<style scoped>
.background-container {
  background-image: url('@/assets/background.jpg'); /* Path to your background image */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.registration-card {
  background-color: #e0ffe0; /* Light green background for the card */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 100, 0, 0.3); /* Green shadow */
  width: 100%;
  max-width: 400px; /* Limit maximum width of the registration card */
}

/* Custom styling for popover */
.popover {
  max-width: 300px; /* Set maximum width */
}

.popover-body {
  background-color: #dff0d8; /* Light green body */
  color: #3c763d; /* Dark green text */
  padding: 20px;
  text-align: center; /* Center text in the popover */
}

.icon-tabler {
  vertical-align: middle;
}

.btn-primary {
  background-color: #28a745; /* Green button background */
  border-color: #28a745; /* Green button border */
}

.btn-secondary {
  background-color: #6c757d; /* Gray button background */
  border-color: #6c757d; /* Gray button border */
}

.text-center {
  text-align: center;
}

.mb-3 {
  margin-bottom: 1rem !important;
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
