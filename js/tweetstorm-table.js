function inserePlacar(tweetStormText) {
    var bodyTable = $(".placar").find("tbody");
    var numWords = tweetStormText ;

    var line = newLine(numWords);
    line.find(".botao-remover").click(removeLine);

    bodyTable.append(line);
}

function newLine(palavras) {
    var line = $("<tr>");
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    line.append(colunaPalavras);
    line.append(colunaRemover);

    return line;
}

function removeLine() {
    event.preventDefault();
    $(this).parent().parent().remove();
}
