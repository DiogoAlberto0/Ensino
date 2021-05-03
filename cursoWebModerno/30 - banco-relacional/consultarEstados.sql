select * from estados

select nome, sigla from estados

select Sigla as 'UF', nome as 'Nome do Estado' from estados
where regiao = "Sul"

select nome as 'UF', regiao as 'Região' from estados
where populacao >= 10
order by populacao desc
