<template>
  <div class="admin-dashboard">
    <AdminNavbar />
    <div class="header">
      <div class="row mt-2">
        <ul class="col-12 d-flex justify-content-end">
          <a data-v-5c6835c0="" href="/logout" class="btn btn-danger">Logout</a>
        </ul>
      </div>
      <div class="intro">
        <h1 class="mb-4" style="text-align: center; font-weight: bold;" >Welcome to the Admin Dashboard</h1>
        <p class="subtitle">Manage users, medical records, and other administrative tasks efficiently.</p>
      </div>
    </div>
    <div class="content">
      <!-- Admin specific content -->
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/Admin/AdminNavbar.vue';

export default {
  name: 'AdminView',
  components: {
    AdminNavbar
  }
};
</script>

<style scoped>
.admin-dashboard {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.header {
  background-color: #dff0d8;
  padding: 20px;
  border-bottom: 1px solid #dff0d8;
}

.header .row {
  margin-bottom: 10px;
}

.logout-link {
  color: #ff0000;
  text-decoration: none;
  font-weight: bold;
}

.logout-link:hover {
  text-decoration: underline;
}

.intro {
  text-align: center;
  margin-top: 20px;
}

.intro h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.intro .subtitle {
  font-size: 1.2rem;
  color: #6c757d;
}

.content {
  padding: 20px;
}
</style>
