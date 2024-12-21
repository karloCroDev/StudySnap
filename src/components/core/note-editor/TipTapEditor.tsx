'use client';

// Eternal packagess
import * as React from 'react';
import { HeartIcon, HeartFilledIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { twMerge } from 'tailwind-merge';

// Components
import { Button } from '@/components/ui/Button';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export const TipTapEditor = () => {
  return (
    <div className="relative mt-8 flex h-full flex-col overflow-hidden rounded-3xl border border-blue-900 p-8">
      <div className="absolute right-6 top-6 rounded-lg bg-gray-100 p-2">
        <Button
          colorScheme="light-blue"
          variant="solid"
          iconRight={<Pencil2Icon className="size-5" />}
          className="font-medium"
        >
          Edit
        </Button>
      </div>
      <div className="prose h-full !max-w-none !overflow-scroll scroll-smooth">
        <h1>Hello world</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
          repudiandae mollitia quis iusto non ducimus eligendi illo repellendus
          aperiam. Soluta, optio id. Sit consequatur dolores sapiente obcaecati
          dolor? Sapiente, perspiciatis. Eligendi veritatis eum necessitatibus
          deserunt ad perferendis maiores nobis, quia porro id dolorem aliquam
          repudiandae architecto repellat itaque unde quod, esse doloribus quo
          eaque autem. Molestias alias ratione odit temporibus. Explicabo beatae
          dicta sequi ad maiores ex? Porro ut delectus laboriosam, sed
          cupiditate qui veniam cum fugiat perferendis quidem corporis impedit
          in explicabo distinctio perspiciatis illum blanditiis, voluptatum ipsa
          quibusdam. Ad quam non nemo error nulla labore, quos aliquid
          distinctio illum praesentium vitae exercitationem ut reiciendis
          impedit libero harum et esse tenetur voluptatum natus illo ullam.
          Laboriosam ipsam dolore odit. Voluptas ad, assumenda voluptatibus
          eius, sint, magni esse fuga explicabo deleniti veniam vero impedit
          facilis illum eum asperiores exercitationem! Omnis expedita alias hic
          enim dolorem fugiat vel repellat eos quia. Explicabo repellat
          obcaecati unde? Sunt asperiores dolor itaque unde quisquam? Obcaecati
          architecto, sapiente pariatur suscipit odio qui voluptatem,
          perferendis ducimus alias rem assumenda? Eum totam assumenda nemo
          repudiandae amet ab. Voluptate vitae quas iure, autem expedita
          assumenda iste illum consequatur maiores dignissimos, dolorem ex!
          Obcaecati neque maiores, rerum consequuntur vitae modi hic nihil
          architecto provident, aperiam porro nesciunt, aliquid molestias? Nam
          beatae dignissimos possimus necessitatibus ratione labore placeat vero
          nulla culpa corporis aut assumenda rerum temporibus quidem
          praesentium, quasi consequuntur libero, voluptatibus perspiciatis ea
          pariatur expedita optio qui tempore? Deleniti? Incidunt magni
          laboriosam fugit! Culpa, ab facilis accusamus labore aut molestias
          deserunt veritatis cupiditate perspiciatis esse, hic adipisci, veniam
          libero est nemo sapiente rem blanditiis quo asperiores. Voluptate,
          officiis sunt! Facilis esse optio impedit accusamus quam perferendis
          quaerat, natus voluptas quod incidunt sunt soluta cum blanditiis
          aspernatur illum distinctio amet, consequuntur possimus sed vitae
          perspiciatis eligendi. Libero atque modi ullam. Tenetur officia
          sapiente accusantium ratione corrupti accusamus iste odit. Incidunt
          beatae non itaque sequi. Illo eos voluptate blanditiis numquam qui
          facilis, repudiandae doloribus facere. Ut ab molestias facilis et
          eius. Magnam ratione cupiditate aliquam eos, ducimus neque deleniti
          maxime consequatur facilis alias sed perspiciatis tenetur odit nihil
          quo, veniam fuga nulla cumque molestias praesentium nobis dolores. Aut
          repellendus doloremque ratione? Reiciendis veniam ipsam sit.
          Distinctio, nam excepturi. Unde et ut voluptates blanditiis
          consequatur quis porro exercitationem rem voluptatem itaque ullam cum
          iusto consectetur qui aperiam dolores, rerum laborum eum dignissimos.
          Placeat inventore libero similique qui facere neque, amet non est
          molestiae dolor corrupti nulla cupiditate facilis itaque voluptatibus
          magnam. Asperiores consequuntur delectus soluta iure odit sunt nam,
          veniam deleniti ad! Doloribus iste voluptate aspernatur vel vero nihil
          veniam alias enim voluptatibus tempora labore porro ea reprehenderit
          neque asperiores nam consequuntur natus sapiente repellendus harum
          totam adipisci qui, voluptates cupiditate. Sit! Debitis voluptatem
          vero laborum quis minima at possimus velit, necessitatibus corporis
          nisi repellat molestiae exercitationem doloribus perspiciatis dolores
          excepturi deleniti fugit mollitia consequuntur? Ex, molestiae atque
          vel quidem similique sed! At sed sapiente ipsa porro veniam animi
          distinctio cum quibusdam non omnis repellat odit, labore, beatae
          cumque unde maiores accusantium. Unde eos vel, aliquam non ipsum
          incidunt facilis at! Nam. Alias incidunt voluptas at perspiciatis ea
          praesentium eligendi temporibus id, explicabo maiores nisi fugiat ipsa
          delectus. Nemo incidunt odit dolore facere temporibus iure. Deleniti
          ea alias rerum distinctio sequi adipisci? Modi, explicabo veritatis,
          totam maxime officia cupiditate neque a ad nam inventore corporis
          culpa. Deserunt, laboriosam fuga. Impedit molestias dolorum minus at
          ducimus, quod eaque consequuntur ipsam, nostrum incidunt consequatur.
          Quod, fuga soluta officia accusantium pariatur quae ipsam ab nisi
          adipisci explicabo sunt iste repellat quibusdam similique quia cumque
          consequatur perferendis eum ullam nesciunt est assumenda sapiente.
          Nesciunt, voluptates repudiandae? Placeat quam odit enim aspernatur,
          aperiam ea deleniti ipsum aliquam. Velit, at dolores? Quo rerum
          expedita consequuntur commodi maiores amet, nobis soluta reiciendis
          hic ullam autem sequi. Ea, atque dolorem. Ipsam illo velit quae
          accusamus aliquam, dolorum veritatis sed nobis commodi. Laborum,
          reprehenderit temporibus modi aspernatur nobis ratione nam consequatur
          reiciendis hic earum rerum dolores dicta quisquam sequi voluptate
          quaerat! Fugiat minus doloribus adipisci impedit alias laborum quia
          saepe aut natus ullam, dicta veritatis, quam quas tempora nihil?
          Consequatur deleniti velit aliquam fugiat hic quia quibusdam delectus
          adipisci officia quo? Consequuntur repellat itaque accusantium ea quos
          officia reprehenderit aut esse accusamus impedit! Veritatis impedit
          aliquam iure quo natus placeat quibusdam porro, ab a error explicabo
          inventore laborum facere! Error, incidunt? Voluptatibus rem suscipit
          sequi obcaecati, quisquam omnis quibusdam et? Alias, iste ducimus quod
          tempore culpa corporis delectus accusamus qui assumenda, optio,
          reiciendis enim. Accusantium, labore? Accusamus iste sequi architecto
          exercitationem? Nesciunt id, quod expedita repellendus rerum
          asperiores iure natus porro qui commodi eaque maiores nobis doloribus
          sint esse, officiis, eveniet quaerat. Enim blanditiis dolorem, neque
          dolores autem qui corporis dolore? Recusandae corrupti aspernatur, a
          iure quo dolor libero. Dolorem mollitia dolor, soluta excepturi, ipsam
          autem consequuntur architecto deserunt odit porro perspiciatis quidem
          voluptates beatae enim error possimus. Atque, esse reprehenderit!
          Nostrum accusantium velit vero, corporis illo debitis quisquam
          voluptatibus eum quas explicabo quidem consequatur, error pariatur
          dolore? Asperiores impedit omnis ipsum quaerat laboriosam possimus,
          id, nihil culpa animi vero minima. Impedit dolores excepturi porro
          asperiores! Mollitia cumque quos quaerat architecto molestiae illo
          magni perspiciatis maiores provident sint! Dolor aliquam omnis, fugiat
          ratione laudantium earum! Possimus non dolor optio commodi placeat!
          Esse autem, inventore est dolorem tenetur velit consequuntur, adipisci
          magni optio maxime repellat, excepturi corrupti error voluptates iusto
          quas nobis possimus ipsam enim ullam officia deserunt. Quisquam
          dignissimos quo similique?
        </p>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="flex cursor-pointer items-center gap-2">
          <HeartIcon className="size-8" />
          <p
            className={twMerge(
              'text-md font-bold !italic',
              plus_jakarta_sans.className
            )}
          >
            200
          </p>
        </div>
        <Button rounded="full" colorScheme="black" variant="outline">
          🪄 Quizz yourself
        </Button>
      </div>
    </div>
  );
};
