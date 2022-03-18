<template>
  <div class="home">
    <Averages />
    <Pickers />
    <TableViewer :tableName="tableName" />
  </div>
</template>

<script>
import Averages from "../components/Averages.vue";
import Pickers from "../components/Pickers.vue";
import TableViewer from "../components/TableViewer.vue";

export default {
  name: "Home",
  components: {
    Averages,
    Pickers,
    TableViewer,
  },
  data() {
    return {
      tableName: "courses",
    };
  },
};
</script>
