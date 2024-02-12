<script>
export default {
  props: ["pages"],
  methods: {
    emitPage(page) {
    this.$emit("emitPages", page); //當前頁面
    },
   },
 };

</script>
<template>
  <nav>
        <ul class="pagination  justify-content-center">
          <li class="page-item" :class="{disabled: !pages.has_pre}">
            <a class="page-link" href="#" aria-label="Previous" 
            @click.prevent="emitPage(pages.current_page -1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          
          <li class="page-item" :class="{active : page === pages.current_page}" v-for="page in pages.total_pages" :key="page">
            <a class="page-link"  href="#" @click.prevent="emitPage(page)">{{page}}</a>
          </li>
          <!-- <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li> -->
          <li class="page-item" :class="{disabled: !pages.has_next}">
            <a class="page-link" href="#" aria-label="Next"  
            @click.prevent="emitPage(pages.current_page +1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
</template>

