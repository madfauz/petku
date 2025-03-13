import user from "./user-seed.js";
import dokter from "./dokter-seed.js";
import praktek from "./praktek-seed.js";
import pelanggan from "./pelanggan-seed.js";
import hewan from "./hewan-seed.js";
import metode from "./pembayaran-seed.js";
import jadwal from "./jadwal-seed.js";
import rekam from "./rekam-seed.js";



async function main() {
  await user();
  await dokter();
  await pelanggan();
  await hewan();
  await metode();
  await praktek();
  await jadwal();
  await rekam();
}

main();
