// @flow

import React from 'react';
import Tabs from './tabs';
import type { Item } from './tabs';

const linkRefs = [
  'https://de.wikipedia.org/wiki/Thesaban#Gro.C3.9Fstadt',
  'https://de.wikipedia.org/wiki/Liste_der_Provinzen_Thailands',
];

const data: Item[] = [
  {
    id: 'san-francisco-ca-us',
    label: 'San Francisco',
    content:
      'San Francisco (Aussprache: ˌsæn fɹənˈsɪskoʊ, auch San Franzisko), offiziell City and County of San Francisco (Stadt und Kreis von San Francisco), ist eine Stadt und eine Metropolregion im US-Bundesstaat Kalifornien an der Westküste der Vereinigten Staaten am Pazifischen Ozean. Mit 805.235 Einwohnern (Stand der Volkszählung 2010) ist sie die viertgrößte Stadt Kaliforniens. Im globalen Vergleich gilt sie neben ähnlich großen Städten wie etwa Frankfurt am Main oder Amsterdam als mittelgroße Weltstadt.',
  },
  {
    id: 'stuttgart-bw-de',
    label: 'Stuttgart',
    content:
      'Stuttgart ist die Hauptstadt des deutschen Bundeslandes Baden-Württemberg und mit über 620.000 Einwohnern dessen größte Stadt. Die sechstgrößte Stadt Deutschlands bildet das Zentrum der rund 2,7 Millionen Einwohner zählenden Region Stuttgart, einem der größten Ballungsräume Deutschlands. Zudem ist sie Kernstadt der europäischen Metropolregion Stuttgart (etwa 5,3 Millionen Einwohner), der fünftgrößten in Deutschland. Stuttgart hat den Status eines Stadtkreises und ist in 23 Bezirke gegliedert.',
  },
  {
    id: 'chiang-mai-th',
    label: 'Chiang Mai',
    content: (
      <span>
        Chiang Mai (auch Chiengmai, Xiang Mai oder Kiangmai) ist eine{' '}
        <a href={linkRefs[0]}>Großstadt</a> in der{' '}
        <a href={linkRefs[1]}>thailändischen Provinz Chiang Mai</a>. Sie ist die Hauptstadt des
        Landkreises (Amphoe) Mueang Chiang Mai und die Hauptstadt der Provinz Chiang Mai. Mit ihren
        135.757 Einwohnern ist sie die größte und kulturell wichtigste Stadt in der Nordregion von
        Thailand und wird wegen der landschaftlichen Schönheit auch Rose des Nordens genannt.
      </span>
    ),
  },
];

const TabsDemo = () => (
  <div>
    <h3>Tabs</h3>
    <Tabs data={data} />
  </div>
);

export default TabsDemo;
