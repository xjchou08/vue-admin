<template>
  <div class="user-container">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 90%; margin: 10px auto"
    >
      <el-table-column label="Date" prop="date"> </el-table-column>
      <el-table-column label="Name" prop="name"> </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              handleEdit(scope.$index, scope.row);
              dialogFormVisible = true;
            "
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑表单 -->

    <el-dialog title="编辑用户" model="false" :visible.sync="dialogFormVisible">
      <el-form :model="tableData1">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="tableData1.name" autocomplete="auto"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="tableData1.address" autocomplete="auto"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEdit = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            handleEdit = false;
            changeUser(tableData1);
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      search: "",
      tableData1: {},
      formLabelWidth: "120px",
      dialogFormVisible: false,
    };
  },
  methods: {
    handleEdit(index, row) {
      this.tableData1 = row;
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用接口
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(index, row);
    },
    // 修改数据
    changeUser(tableData1) {
      console.log(tableData1);
    },
  },
};
</script>
