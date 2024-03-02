<template>
  <el-row>
    <el-button size="large">
      大按钮
    </el-button>
    <el-button>默认按钮</el-button>
    <el-button size="small">
      小按钮
    </el-button>
    <el-button size="large" :icon="Search">
      Search
    </el-button>
    <el-button :icon="Search">
      Search
    </el-button>
    <el-button size="small" :icon="Search">
      Search
    </el-button>
  </el-row>
  <el-row class="my-4">
    <el-button size="large" round>
      大按钮
    </el-button>
    <el-button round>
      默认按钮
    </el-button>
    <el-button size="small" round>
      小按钮
    </el-button>
    <el-button size="large" :icon="Search" round>
      Search
    </el-button>
    <el-button :icon="Search" round>
      Search
    </el-button>
    <el-button size="small" :icon="Search" round>
      Search
    </el-button>
  </el-row>
  <el-row>
    <el-button :icon="Search" size="large" circle />
    <el-button :icon="Search" circle />
    <el-button :icon="Search" size="small" circle />
  </el-row>
</template>
