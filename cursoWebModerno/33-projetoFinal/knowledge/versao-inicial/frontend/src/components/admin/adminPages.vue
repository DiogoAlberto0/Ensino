<template>
<div>
    <PageTitle icon="fa fa-cogs" main="Administração" sub="cadastros & cia" />
    <div class="admin-pages-tab">
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Artigos" active>
                    <ArticleAdmin />
                </b-tab>
                <b-tab title="Categorias" active>
                    <CategoryAdmin />
                </b-tab>
                <b-tab title="Usuários" active>
                    <UsersAdmin />
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</div>
</template>

<script>
import PageTitle from '../template/PageTitle'

import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UsersAdmin from './UsersAdmin'

export default {
    name: 'adminPages',
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UsersAdmin }

}
</script>

<style>

</style>