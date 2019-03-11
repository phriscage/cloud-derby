<template>
  <Welcome msg="Welcome to the Driving Controller" />
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome';

export default {
  name: 'home',
  components: {
    Welcome
  }
};
</script>
