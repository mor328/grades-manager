<template>
  <div>
    <div class="q-pa-md q-ma-md">
      <q-table
        :title="title"
        :data="filteredCourses"
        :columns="columns"
        separator="cell"
        row-key="name"
        title-class="justify-content"
      >
        <template v-slot:top>
          <q-space />
          <div class="q-table__title text-h4" style="font-weight: 700">
            {{ title }}
          </div>
          <q-space />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              key="name"
              :props="props"
              @click="redirectToItem(props.row.id)"
            >
              {{ props.row.name }}</q-td
            >
            <q-td
              v-for="column in filteredColums"
              :key="column.name"
              :props="props"
            >
              {{ props.row[column.name] }}
            </q-td>
            <q-td key="actions" :props="props">
              <div class="q-pa-xs">
                <q-btn
                  class="q-mr-md"
                  glossy
                  color="warning"
                  size="11px"
                  no-caps
                  @click="update(props.row.id)"
                  >Update</q-btn
                >
                <q-btn
                  color="negative"
                  glossy
                  size="11px"
                  no-caps
                  @click="remove(props.row.id)"
                  >Delete</q-btn
                >
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="text-center">
        <q-btn
          color="positive"
          glossy
          no-caps
          class="q-my-md"
          text-color="white"
          label="Add Course"
          @click="addCourse()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import firebaseDatabase from "../middleware/firebase/database";

export default {
  name: "TableViewer",
  props: ["tableName"],
  data() {
    return {
      coursesOfTable: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "Course Name",
          align: "center",
          field: "name",
          sortable: true,
          style: "font-size:16px",
          headerStyle: "font-size:16px;font-weight:700;width:25%",
        },
        {
          name: "professor",
          align: "center",
          label: "Professor",
          field: "professor",
          sortable: true,
          style: "font-size:16px",
          headerStyle: "font-size:16px;font-weight:700;width:20%",
        },
        {
          name: "creditPoints",
          align: "center",
          label: "Credit Points",
          field: "creditPoints",
          style: "font-size:16px",
          sortable: true,
          headerStyle: "font-size:16px;font-weight:700;width:20%",
        },
        {
          name: "grade",
          label: "Grade",
          field: "grade",
          align: "center",
          sortable: true,
          style: "font-size:16px",
          headerStyle: "font-size:16px;font-weight:700;width:20%",
        },
        {
          name: "actions",
          align: "center",
          label: "Actions",
          headerStyle: "font-size:16px;font-weight:700;width:15%",
        },
      ],
    };
  },
  computed: {
    ...mapState("courses", [
      "courses",
      "filteredCourses",
      "currentYear",
      "currentSemester",
    ]),
    ...mapGetters("courses", ["getCoursesByYearAndSemester"]),
    filteredColums: function () {
      return this.columns.filter(
        (column) => column.name !== "name" && column.name !== "actions"
      );
    },
    title: function () {
      return this.tableName[0].toUpperCase() + this.tableName.slice(1);
    },
  },
  methods: {
    ...mapActions("courses", [
      "getCourses",
      "getFilteredCourses",
      "deleteCourse",
      "calcAverage",
      "updateTableAndAverages",
    ]),
    ...mapMutations("courses", ["setEditedCourseId", "resetEditedCourseId"]),
    addCourse() {
      this.$router.push(`/${this.tableName}/`);
    },
    redirectToItem(id) {
      this.$router.push(`/${this.tableName}/${id}`);
    },
    remove(id) {
      this.setEditedCourseId(id);
      this.deleteCourse();
      this.resetEditedCourseId(id);
    },
    update(id) {
      this.redirectToItem(id);
    },
  },
  created() {
    firebaseDatabase.getRef({ tableName: this.tableName }).on("value", () => {
      this.getCourses().then(() => {
        this.calcAverage({ averageType: "degree" });
        this.getFilteredCourses();
        this.updateTableAndAverages({
          semesterOnly: false,
        });
      });
    });
  },
};
</script>

<style></style>
