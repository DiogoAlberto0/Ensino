<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible}">
		<myHeader title="Diogo Alberto" :hideToggle="false" :hideUserDropdown="false"/>
		<Menu />
		<Content />
		<myFooter />

	</div>
</template>

<script>
import myHeader from '../src/components/template/myHeader'
import Content from '../src/components/template/Content'
import myFooter from '../src/components/template/myFooter'
import Menu from '../src/components/template/Menu'
import {mapState} from 'vuex'


export default {
	name: "App",
	components: {
		myHeader,
		Content,
		myFooter,
		Menu
	},
	computed: mapState(['isMenuVisible'])
}
</script>

<style>
	body {
		margin: 0px;
	}
	#app {
		height: 100vh;
		display:grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;

		grid-template-areas: "header header" "menu content" "menu footer";
	}
	#app.hide-menu {
		grid-template-areas: "header header" "content content" "footer footer";
	}
</style>