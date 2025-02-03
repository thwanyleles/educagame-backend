/*
  Warnings:

  - A unique constraint covering the columns `[alunoId,quizId]` on the table `Resultado` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resultado_alunoId_quizId_key" ON "Resultado"("alunoId", "quizId");
