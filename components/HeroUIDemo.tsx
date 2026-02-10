'use client';

import { Button, Card, CardBody } from '@heroui/react';

export function HeroUIDemo() {
    return (
        <div className="p-8 flex gap-4 items-center">
            <Button color="primary" variant="solid">
                HeroUI Button
            </Button>
            <Card>
                <CardBody>
                    <p>HeroUI Card</p>
                </CardBody>
            </Card>
        </div>
    );
}
