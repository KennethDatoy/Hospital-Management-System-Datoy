<template>
  <div>
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <router-link class="navbar-brand" to="/admin">Admin Dashboard</router-link>
      </div>
      <ul class="sidebar-nav">
        <li class="sidebar-item">
          <router-link class="sidebar-link" to="/doctors">Manage Doctors</router-link>
        </li>
        <li class="sidebar-item">
          <router-link class="sidebar-link" to="/patients">Manage Patients</router-link>
        </li>
        <li class="sidebar-item">
          <router-link class="sidebar-link" to="/appointments">Manage Appointments</router-link>
        </li>
        <li class="sidebar-item">
          <router-link class="sidebar-link" to="/medicalRecords">Manage Medical Records</router-link>
        </li>
      </ul>
    </div>

    <!-- Main content area -->
    <div class="content">
      <!-- Your main content area goes here -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
};
</script>

<style scoped>
/* Sidebar styles */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #218838;
  color: #fff;
  padding-top: 50px;
}

.sidebar-header {
  padding: 20px;
  text-align: center;
}

.sidebar-nav {
  list-style-type: none;
  padding: 0;
}

.sidebar-item {
  margin-bottom: 1rem;
}

.sidebar-link {
  color: #f8f9fa !important;
  font-size: 1rem;
  padding: 10px 20px;
  display: block;
  text-decoration: none;
}

.sidebar-link:hover {
  background-color: #218838;
  color: #ffc107 !important;
}

/* Main content area */
.content {
  margin-left: 250px; /* Adjust this value to match the sidebar width */
  padding: 20px;
}

</style>
