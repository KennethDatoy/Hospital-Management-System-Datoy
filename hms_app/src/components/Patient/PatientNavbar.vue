<template>
  <div class="sidebar custom-navbar">
    <router-link class="sidebar-brand" to="/patientdashboard">Patient Dashboard</router-link>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link" to="/medicalRecords">Medical Records</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PatientNavbar'
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #218838;
  padding-top: 20px;
  overflow-x: hidden;
}

.sidebar-brand {
  display: block;
  padding: 1rem;
  color: #fff !important;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.sidebar-brand:hover {
  color: #f8f9fa !important;
}

.nav-link {
  color: #f8f9fa !important;
  font-size: 1.1rem;
  margin-left: 1rem;
}

.nav-link:hover {
  color: #ffc107 !important;
  text-decoration: underline;
}

.nav-item:last-child .nav-link {
  margin-right: 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    position: relative;
    padding-top: 0;
  }
}
</style>
